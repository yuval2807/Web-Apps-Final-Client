import mongoose, { Schema } from "mongoose";

// Interface to define the structure of a Like document
export interface ILike {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  createdAt?: Date;
}

// Define the schema
const LikeSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a compound index
LikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

// Create and export the model
export default mongoose.model<ILike>("Like", LikeSchema);
