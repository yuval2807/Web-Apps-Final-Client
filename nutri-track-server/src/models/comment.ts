import mongoose from "mongoose";
import User from "./user";
import Post from "./post";

const Schema = mongoose.Schema;

export interface IComment {
  message: string;
  post: typeof Post;
  user: typeof User;
}

const commentSchema = new Schema<IComment>({
  message: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: true,
  }, // Reference to Post
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  }, // Reference to User
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
