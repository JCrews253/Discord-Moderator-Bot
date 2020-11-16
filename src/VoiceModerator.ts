import { Message } from "discord.js";
import { approvedMods } from "./ChatModerator";

export type VoiceCommands = "mute" | "unmute";
export const VoiceCommandsArray = ["mute", "unmute"];

export const VoiceModerator = (
  command: VoiceCommands,
  args: string[],
  message: Message
) => {
  switch (command) {
    case "mute": {
      if (approvedMods.includes(message.author.id)) {
        var time = parseInt(args[1]) * 60 * 1000 ?? 5 * 60 * 1000;
        message.mentions.members.first().voice.setMute(true);
        setTimeout(() => {
          message.mentions.members.first().voice.setMute(false);
          message.channel.send(
            "<@" +
              message.mentions.members.first().id +
              ">, Your mute time out has ended"
          );
        }, time);
      }
      break;
    }

    case "unmute": {
      if (approvedMods.includes(message.author.id)) {
        message.mentions.members.first().voice.setMute(false);
      }
      break;
    }

    default: {
      break;
    }
  }
};
