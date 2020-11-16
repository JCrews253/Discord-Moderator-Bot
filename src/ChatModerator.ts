import { Message } from "discord.js";
import { prefix } from "./Settings";

export type ChatCommands =
  | "banword"
  | "unbanword"
  | "timeout"
  | "untimeout"
  | "clean"
  | "addmod"
  | "removemod";

export const ChatCommandsArray = [
  "banword",
  "unbanword",
  "timeout",
  "untimeout",
  "clean",
  "addmod",
  "removemod",
];

var bannedWords: string[] = [];
export var approvedMods: string[] = [
  "293874643771588608",
  "268137373060169728",
];
var timedOutUsers: string[] = [];

export const ChatModerator = async (
  command: ChatCommands,
  args: string[],
  message: Message
) => {
  switch (command) {
    case "banword": {
      if (approvedMods.includes(message.author.id)) {
        bannedWords.push(...args);
      }
      break;
    }

    case "unbanword": {
      if (approvedMods.includes(message.author.id)) {
        bannedWords = bannedWords.filter((w) => !args.includes(w));
      }
      break;
    }

    case "timeout": {
      if (approvedMods.includes(message.author.id)) {
        timedOutUsers.push(message.mentions.members.first().id);
        var time = parseFloat(args[1]) * 1000 * 60;
        setTimeout(() => {
          timedOutUsers = timedOutUsers.filter(
            (u) => u !== message.mentions.members.first().id
          );
          message.channel.send(
            "<@" +
              message.mentions.members.first().id +
              ">, Your time out has ended"
          );
        }, time);
      }
      break;
    }

    case "untimeout": {
      if (approvedMods.includes(message.author.id)) {
        timedOutUsers = timedOutUsers.filter((u) => !args.includes(u));
      }
      break;
    }

    case "clean": {
      var messagesToDelete = await message.channel.messages
        .fetch({
          limit: 100,
        })
        .then((messages) =>
          messages.filter(
            (m) =>
              m.author.id === process.env.BOT_ID || m.content.startsWith(prefix)
          )
        );
      if (message.channel.type === "text") {
        message.channel.bulkDelete(messagesToDelete);
      }
      break;
    }

    case "addmod": {
      if (approvedMods.includes(message.author.id)) {
        message.mentions.members.forEach((m) => approvedMods.push(m.id));
      }
      break;
    }

    case "removemod": {
      if (approvedMods.includes(message.author.id)) {
        approvedMods = approvedMods.filter((m) => !args.includes(m));
      }
      break;
    }

    default: {
      message.reply("Error");
      break;
    }
  }
};

export const ModerateMessage = async (message: Message): Promise<boolean> => {
  // delete timed out users messages
  if (timedOutUsers.includes(message.author.id)) {
    message.delete();
    return false;
  }
  // Check if message contains any banned words
  else if (
    bannedWords.some((w) =>
      message.content.toLowerCase().split(" ").join("").includes(w)
    )
  ) {
    message.delete();
    return false;
  } else {
    return true;
  }
};
