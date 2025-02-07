import PageLayout from "../../components/Common/PageLayout";
import { useContext, useEffect, useState } from "react";
import { PostsList } from "../../components/Post/PostList";
import { getAllPosts, PostData } from "../../queries/post";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

export const PostsPage: React.FC = () => {
  const [postList, setPostList] = useState<PostData[]>([]);
  const { connectedUser } = useContext(UserContext);

  const fetchPosts = async () => {
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const response = await getAllPosts(accessToken);
      if (response) {
        setPostList(response);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(" משהו השתבש!");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PageLayout>
      {postList ? <PostsList postList={postList} showLikes={true} /> : null}
    </PageLayout>
  );
};
