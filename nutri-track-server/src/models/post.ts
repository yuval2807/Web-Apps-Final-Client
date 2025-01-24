import mongoose from "mongoose";
import User from "./user";

const Schema = mongoose.Schema;

export interface IPost {
  title: string;
  content: string;
  image: string;
  date: Date;
  sender: typeof User;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  content: String,
  image: String,
  date: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  }, // Reference to User
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;
