import { Message } from "discord.js";
import { ChatCommands } from "./ChatModerator";
import { MusicCommands } from "./MusicPlayer";
import { prefix, SettingsCommands } from "./Settings";
import { VoiceCommands } from "./VoiceModerator";

export type Commands =
  | MusicCommands
  | SettingsCommands
  | ChatCommands
  | VoiceCommands;

export type HelpCommands = "help";
export const HelpCommandsArray = ["help"];

export const Help = (command: Commands, message: Message) => {
  var channel = message.channel;
  switch (command) {
    case "addmod": {
      channel.send(
        `Add a mod to the approved mods list \nArgs: User \nExample: ${prefix}${command} @DoctorCarry`
      );
      break;
    }

    case "banword": {
      channel.send(
        `Add a word to the banned words list \nArgs: Word \nExample: ${prefix}${command} test`
      );
      break;
    }

    case "clean": {
      channel.send(
        `Delete all bot and command messages \nArgs: None \nExample: ${prefix}${command}`
      );
      break;
    }

    case "code" || "source": {
      channel.send(
        `Link to code source \nArgs: None \nExample: ${prefix}${command}`
      );
      break;
    }

    case "mute": {
      channel.send(
        `Server voice mutes a user for a duration \nArgs: User Time(in minutes) \nExample: ${prefix}${command} @DoctorCarry 5`
      );
      break;
    }

    case "pause": {
      channel.send(
        `Pauses the current song thats playing \nArgs: None \nExample: ${prefix}${command}`
      );
      break;
    }

    case "play": {
      channel.send(
        `Plays or queues songs to play \nArgs: Song \nExample: ${prefix}${command} Love of my life`
      );
      break;
    }

    case "prefix": {
      channel.send(
        `Returns the set command prefix \nArgs: None \nExample: ${prefix}${command}`
      );
      break;
    }

    case "queue": {
      channel.send(
        `Returns the queue of songs \nArgs: None \nExample: ${prefix}${command}`
      );
      break;
    }

    case "removemod": {
      channel.send(
        `Remove a mod from the approved mods list \nArgs: User \nExample: ${prefix}${command} @DoctorCarry`
      );
      break;
    }

    case "resume": {
      channel.send(
        `Resume the current song thats paused \nArgs: None \nExample: ${prefix}${command}`
      );
      break;
    }

    case "setprefix": {
      channel.send(
        `Set the saved command prefix \nArgs: Prefix \nExample: ${prefix}${command} ?`
      );
      break;
    }

    case "skip": {
      channel.send(
        `Skips the current song thats playing \nArgs: None \nExample: ${prefix}${command}`
      );
      break;
    }

    case "timeout": {
      channel.send(
        `Timeout a user from text chat for a duration \nArgs: User Time(in minutes) \nExample: ${prefix}${command} @DoctorCarry 5`
      );
      break;
    }

    case "unbanword": {
      channel.send(
        `Remove a word from the banned words list \nArgs: Word \nExample: ${prefix}${command} test`
      );
      break;
    }

    case "unmute": {
      channel.send(
        `Remove voice mute from user \nArgs: User \nExample: ${prefix}${command} @DoctorCarry`
      );
      break;
    }

    case "untimeout": {
      channel.send(
        `Untimeout a user from text chat \nArgs: User \nExample: ${prefix}${command} @DoctorCarry`
      );
      break;
    }

    case "volume": {
      channel.send(
        `Set the volume of the song thats playing \nArgs: Volume(%) \nExample: ${prefix}${command} 50`
      );
      break;
    }

    default: {
      channel.send("Invalid command");
      break;
    }
  }
};
