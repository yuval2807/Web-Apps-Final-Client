import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDatabase = async () => {
  await mongoose.connect(process.env.DB_CONNECTION);

  const db = mongoose.connection;

  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));
};

export default connectToDatabase;
