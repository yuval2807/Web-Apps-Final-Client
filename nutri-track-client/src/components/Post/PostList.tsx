import { PostData } from "../../queries/post";
import { PostCard } from "./PostCard";

export interface PostsListData {
  postList: PostData[];
  direction?: "column" | "row";
}

export const PostsList: React.FC<PostsListData> = ({
  postList,
  direction = "column",
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: direction === "row" ? "repeat(3, 1fr)" : "1fr",
        gap: "16px", 
      }}>
      {postList.map((post: PostData) => (
        <PostCard
          title={post?.title}
          content={post?.content}
          image={post?.image}
          date={post?.date}
        />
      ))}
    </div>
  );
};
