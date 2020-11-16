import { Cursor, Db, FilterQuery, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.79mrp.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
var db: Db = null;
const dbName = "CSGO-Discord";

export const StartDbConnection = async () => {
  await client.connect();
  db = client.db(dbName);
  UpdateBannedWords(["test", "test2"]);
  GetBannedWords();
};

export const UpdateBannedWords = async (bannedWordssss: string[]) => {
  const insert = [
    {
      bannedWords: {
        ...bannedWordssss,
      },
    },
  ];
  try {
    await db.collection("bannedWords").insertMany(insert);
  } catch (error) {
    console.error("Failed to upadate banned words in MongoDB", error);
  }
};

interface IBannedWords {
  bannedWords: string[];
}

export const GetBannedWords = async () => {
  //const query = { bannedWords: "bannedWords" };
  try {
    const cursor: Cursor<IBannedWords> = await db
      .collection("bannedWords")
      .find();
    //console.log({ cursor });
  } catch (error) {
    console.error("Failed to read banned words from MongoDB", error);
  }
};
