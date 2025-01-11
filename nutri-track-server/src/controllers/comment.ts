import { ObjectId } from "mongoose";
import commentModel, { IComment } from "../models/comment";

export const getAllComments = () => commentModel.find();

export const getCommentById = (id: string) => commentModel.findById(id);

export const getCommentsByPostId = (post) => commentModel.find({ post });

export const addNewComment = (comment: IComment) =>
  commentModel.create(comment);

export const updateCommentById = (id: string, { message, post, user }) =>
  commentModel.findByIdAndUpdate(id, { message, post, user }, { new: true });

export const deleteCommentById = (id: string) =>
  commentModel.findByIdAndDelete(id);
