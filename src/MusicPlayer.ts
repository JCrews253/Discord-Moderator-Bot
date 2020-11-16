import { StreamDispatcher, VoiceConnection } from "discord.js";
import { Message } from "discord.js";
import * as ytdl from "ytdl-core";
import { google } from "googleapis";

export type MusicCommands =
  | "play"
  | "pause"
  | "resume"
  | "skip"
  | "volume"
  | "queue";
export const MusicCommandsArray = [
  "play",
  "pause",
  "resume",
  "skip",
  "volume",
  "queue",
];

var connection: VoiceConnection = undefined;
var dispatcher: StreamDispatcher = undefined;
var currentlyPlaying: boolean = false;
var songQueue: string[] = [];

// Youtube Search
var youtube = google.youtube("v3");

export const MusicPlayer = async (
  command: MusicCommands,
  args: string[],
  message: Message
) => {
  var arg = "";
  args.forEach((a) => (arg = arg + a + " "));

  const SearchYoutube = async (search: string): Promise<string> => {
    var url = "";
    await youtube.search
      .list({
        key: process.env.YOUTUBE_TOKEN,
        part: ["snippet"],
        q: search,
        maxResults: 1,
      })
      .then(
        (res) =>
          (url = `https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`)
      )
      .catch((err) => {
        console.error(err);
        url = search;
      });
    return url;
  };

  const PlayNextSong = async () => {
    if (songQueue.length > 0) {
      connection.play(
        await ytdl(await SearchYoutube(songQueue.shift()), {
          filter: "audio",
          highWaterMark: 1 << 25,
        })
      );
    } else {
      dispatcher.destroy();
      connection.disconnect();
      currentlyPlaying = false;
    }
  };

  switch (command) {
    case "play": {
      connection = await message.member.voice.channel.join();
      if (!currentlyPlaying) {
        dispatcher = connection.play(
          await ytdl(await SearchYoutube(arg), {
            filter: "audio",
            highWaterMark: 1 << 25,
          }),
          { volume: 0.5 }
        );
        dispatcher.on("start", () => {
          console.log("Song is now playing!");
        });
        dispatcher.on("finish", async () => {
          console.log("Song has finished playing!");
          PlayNextSong();
        });
        dispatcher.on("error", console.error);
        currentlyPlaying = true;
      } else {
        songQueue.push(arg);
      }
      break;
    }

    case "queue": {
      var queue = [...songQueue];
      await message.channel.send(
        queue.length > 0
          ? queue.map((_, idx) => {
              return `${idx + 1} - ${queue[idx]}`;
            })
          : "The queue is empty"
      );
      break;
    }

    case "pause": {
      if (currentlyPlaying) {
        dispatcher.pause();
        currentlyPlaying = false;
      }
      break;
    }

    case "resume": {
      if (!currentlyPlaying) {
        dispatcher.resume();
      }
      break;
    }

    case "skip": {
      PlayNextSong();
      break;
    }

    case "volume": {
      dispatcher.setVolume(
        isNaN(parseInt(arg))
          ? 0.5
          : Math.min(Math.max(parseInt(arg), 0), 100) / 100
      );
      break;
    }

    default: {
      message.reply("Error");
      break;
    }
  }
};
