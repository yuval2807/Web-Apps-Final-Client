import PageLayout from "../../components/Common/PageLayout";
import { useEffect, useState } from "react";
import { PostsList } from "../../components/Post/PostList";
import { PostData } from "../../components/Post/PostCard";
import { getAllPosts } from "../../queries/post";

export const PostsPage: React.FC = () => {

  const [postList, setPostList] = useState<PostData[]>([]);

  const fetchPosts = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.log("No access token found");
          return;
        }
  
      const response = await getAllPosts(accessToken);
      if (response.status === 200) {
        console.log("Query success");
        setPostList(response.data);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PageLayout>
        {postList ? (<PostsList postList={postList} ></PostsList>) : null }
    </PageLayout>
  );
};
