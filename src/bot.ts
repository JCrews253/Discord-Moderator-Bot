import * as dotenv from "dotenv";
import { Client, Message } from "discord.js";
import { MusicCommands, MusicCommandsArray, MusicPlayer } from "./MusicPlayer";
import {
  ChatCommands,
  ChatCommandsArray,
  ChatModerator,
  ModerateMessage,
} from "./ChatModerator";
import {
  prefix,
  Settings,
  SettingsCommands,
  SettingsCommandsArray,
} from "./Settings";
import {
  VoiceCommands,
  VoiceCommandsArray,
  VoiceModerator,
} from "./VoiceModerator";
import { Commands, Help, HelpCommandsArray } from "./Help";
import { StartDbConnection } from "./MongoDB";
import {
  VideoPlayer,
  VideoPlayerCommands,
  VideoPlayerCommandsArray,
} from "./VideoPlayer";

dotenv.config();

export const client = new Client();

client.on("ready", async () => {
  console.log("The bot has logged in.");
  client.user.setActivity(`${prefix}help`);
  await StartDbConnection();
});

client.on("message", async (message: Message) => {
  if (!ModerateMessage(message)) return;

  if (message.content.startsWith(prefix)) {
    const [command, ...args] = message.content
      .substring(prefix.length)
      .split(" ");
    if (command === "commands") {
      GetCommands(message);
    } else if (MusicCommandsArray.includes(command)) {
      MusicPlayer(command as MusicCommands, args, message);
    } else if (ChatCommandsArray.includes(command)) {
      ChatModerator(command as ChatCommands, args, message);
    } else if (SettingsCommandsArray.includes(command)) {
      Settings(command as SettingsCommands, args, message);
    } else if (VoiceCommandsArray.includes(command)) {
      VoiceModerator(command as VoiceCommands, args, message);
    } else if (HelpCommandsArray.includes(command)) {
      Help(args[0] as Commands, message);
    } else if (VideoPlayerCommandsArray.includes(command)) {
      VideoPlayer(command as VideoPlayerCommands, message);
    }
  }
});

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  let newUserChannel = newMember.channelID;
  let oldUserChannel = oldMember.channelID;

  console.log(newUserChannel, oldUserChannel);

  if (oldUserChannel === null && newUserChannel !== null) {
  } else if (newUserChannel === null) {
    // User leaves a voice channel
  }
});

client.on("error", (err) => {
  console.error(`bot encountered an error, ${err}`);
});

client.login(process.env.MODERATOR_BOT_TOKEN);

const GetCommands = (message: Message) => {
  message.reply(`Commands:
  Music: \n${MusicCommandsArray.map((c) => `${prefix}${c}`).join("\n")}\n
  Chat: \n${ChatCommandsArray.map((c) => `${prefix}${c}`).join("\n")}\n
  Voice: \n${VoiceCommandsArray.map((c) => `${prefix}${c}`).join("\n")}\n
  Other: \n${SettingsCommandsArray.map((c) => `${prefix}${c}`).join("\n")}`);
};
