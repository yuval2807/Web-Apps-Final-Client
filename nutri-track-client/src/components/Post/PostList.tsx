import { PostCard, PostData } from "./PostCard";

export interface PostsListData {
  postList: PostData[];
  showLikes: boolean;
}

export const PostsList: React.FC<PostsListData> = ({ postList, showLikes }) => {
  return (
    <div>
      {postList.map((post: PostData) => (
        <PostCard
          post={post}
          showLikes={showLikes}
        />
      ))}
    </div>
  );
};
