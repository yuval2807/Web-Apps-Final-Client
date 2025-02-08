import { PostData } from "../../queries/post";
import { PostCard } from "./PostCard";

export interface PostsListData {
  postList: PostData[];
  direction?: "column" | "row";
  showLikes: boolean;
}

export const PostsList: React.FC<PostsListData> = ({
  postList,
  showLikes,
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
        <PostCard post={post} showLikes={showLikes} />
      ))}
    </div>
  );
};
