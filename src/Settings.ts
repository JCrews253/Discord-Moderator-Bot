import { Message } from "discord.js";
import { approvedMods } from "./ChatModerator";

export type SettingsCommands = "setprefix" | "prefix" | "source" | "code";
export const SettingsCommandsArray = ["setprefix", "prefix", "source", "code"];

export var prefix = "?";

export const Settings = (
  command: SettingsCommands,
  args: string[],
  message: Message
) => {
  switch (command) {
    case "setprefix": {
      if (approvedMods.includes(message.author.id) && args[0].length > 0) {
        prefix = args[0];
      } else if (approvedMods.includes(message.author.id)) {
        message.reply("prefix is not valid");
      } else {
        message.reply("you are not approved to make this change.");
      }
      break;
    }

    case "prefix": {
      message.reply(`The command prefix is - ${prefix}`);
      break;
    }

    case "code" || "source": {
      message.reply(
        "Source code can be found at https://github.com/JCrews253/Discord-Moderator-Bot"
      );
      break;
    }

    default: {
      message.reply("Error");
      break;
    }
  }
};

// npx ts-node src/bot.ts
