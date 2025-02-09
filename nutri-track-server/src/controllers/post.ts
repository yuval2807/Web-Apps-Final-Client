import mongoose, { ObjectId } from "mongoose";
import postModel, { IPost } from "../models/post";

export const getAllPostsWithLikes = (skip: number, limit: number) =>
  postModel.aggregate([
    {
      $match: {},
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "senderData",
      },
    },
    {
      $unwind: "$senderData",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        image: 1,
        date: 1,
        sender: 1,
        numOfLikes: { $size: "$likes" },
        numOfComments: { $size: "$comments" },
        senderData: {
          _id: "$senderData._id",
          name: "$senderData.name",
          image: "$senderData.image",
        },
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

export const getAllPostsWithLikesBySender = (senderId: string) =>
  postModel.aggregate([
    {
      $match: {
        sender: new mongoose.Types.ObjectId(senderId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "senderData",
      },
    },
    {
      $unwind: "$senderData",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        image: 1,
        date: 1,
        sender: 1,
        numOfLikes: { $size: "$likes" },
        numOfComments: { $size: "$comments" },
        senderData: {
          _id: "$senderData._id",
          name: "$senderData.name",
          image: "$senderData.image",
        },
      },
    },
  ]);

export const getPostById = (id: string) => postModel.findById(id);

export const addNewPost = (post: IPost) => postModel.create(post);

export const updatePostById = (id: string, { title, content, sender, image }) =>
  postModel.findByIdAndUpdate(
    id,
    { title, content, sender, image },
    { new: true }
  );

export const deletePostById = (id: string) => postModel.findByIdAndDelete(id);

export const countTotalRecords = async () => {
  return await postModel.countDocuments();
};
