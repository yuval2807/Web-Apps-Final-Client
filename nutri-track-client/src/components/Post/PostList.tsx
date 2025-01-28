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
          _id={post?._id}
          title={post?.title}
          content={post?.content}
          sender={post?.sender}
          image={post?.image}
          numOfLikes={post?.numOfLikes}
          date={post?.date}
          showLikes={showLikes}
        />
      ))}
    </div>
  );
};
