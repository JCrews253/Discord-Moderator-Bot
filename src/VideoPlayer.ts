import { Message } from "discord.js";
import * as dotenv from "dotenv";
import * as puppeteer from "puppeteer";

dotenv.config();

export type VideoPlayerCommands = "playmovie" | "playshow";
export const VideoPlayerCommandsArray = ["playmovie", "playshow"];

var browser: puppeteer.Browser;
var page: puppeteer.Page;

const LaunchDiscordWeb = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { height: 1000, width: 1520 },
      args: ["--use-file-for-fake-audio-capture"],
    });
    await Login();
    await page.waitForTimeout(8000);
  }
};

const Login = async () => {
  page = await browser.newPage();
  await page.goto("https://discord.com/login");
  await page.waitForTimeout(5000);

  const username = await page.$('[name="email"]');
  username.click();
  username.type(process.env.VIDEO_BOT_EMAIL.toString());
  await page.waitForTimeout(500);

  const password = await page.$('[name="password"]');
  password.click();
  password.type(process.env.VIDEO_BOT_PASSWORD.toString());
  await page.waitForTimeout(500);
  password.press(String.fromCharCode(13));
};

const JoinServer = async (id: string) => {
  const element = await page.$(`[data-list-item-id="guildsnav___${id}"]`);
  await element.click();
  await page.waitForTimeout(1000);
};

const JoinChannel = async (id: string) => {
  const element = await page.$(`[data-list-item-id="channels___${id}"]`);
  await element.click();
  await page.waitForTimeout(1000);
};

const ShareScreen = async () => {
  const shareScreenButton = await page.$(`[aria-label="Share Your Screen"]`);
  await shareScreenButton.click();
  page.waitForTimeout(500);
};

export const VideoPlayer = async (
  command: VideoPlayerCommands,
  message: Message
) => {
  switch (command) {
    case "playmovie": {
      await LaunchDiscordWeb();
      await JoinServer(message.guild.id);
      await JoinChannel(message.member.voice.channelID);
      await ShareScreen();
      break;
    }

    case "playshow": {
      break;
    }

    default: {
      break;
    }
  }
};
