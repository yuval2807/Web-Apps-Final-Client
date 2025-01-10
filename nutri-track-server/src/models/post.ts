import mongoose from "mongoose";
import User from "./user";

const Schema = mongoose.Schema;

export interface IPost {
  title: string;
  content: string;
  sender: typeof User;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  content: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  }, // Reference to User
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;
