import commentModel, { IComment } from "../models/comment";
import { Types } from "mongoose";

export const getAllComments = () =>
  commentModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $unwind: "$userData",
    },
    {
      $project: {
        message: 1,
        user: {
          _id: "$userData._id",
          name: "$userData.name",
          image: "$userData.image",
        },
      },
    },
  ]);

export const getCommentById = (id: string) => commentModel.findById(id);

export const getCommentsByPostId = (postId) =>
  commentModel.aggregate([
    {
      $match: {
        post: Types.ObjectId.createFromHexString(postId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $unwind: "$userData",
    },
    {
      $project: {
        message: 1,
        user: {
          _id: "$userData._id",
          name: "$userData.name",
          image: "$userData.image",
        },
      },
    },
  ]);

export const addNewComment = (comment: IComment) =>
  commentModel.create(comment);

export const updateCommentById = (id: string, { message, post, user }) =>
  commentModel.findByIdAndUpdate(id, { message, post, user }, { new: true });

export const deleteCommentById = (id: string) =>
  commentModel.findByIdAndDelete(id);
