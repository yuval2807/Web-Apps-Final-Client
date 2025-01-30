import likeModel, { ILike } from "../models/like";

export const getLike = (like: ILike) => likeModel.findOne(like);

export const addNewLike = (like: ILike) => likeModel.create(like);

export const removeLike = (likeId: string) => likeModel.findByIdAndDelete(likeId);
