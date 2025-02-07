import postModel, { IPost } from "../models/post";

export const getAllPosts = () => postModel.find();

export const getPostById = (id: string) => postModel.findById(id);

export const getPostBySender = (senderId) =>
  postModel.find({ sender: senderId });

export const addNewPost = (post: IPost) => postModel.create(post);

export const updatePostById = (id: string, { title, content, sender }) =>
  postModel.findByIdAndUpdate(id, { title, content, sender }, { new: true });
