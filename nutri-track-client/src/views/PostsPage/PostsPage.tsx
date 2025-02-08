import PageLayout from "../../components/Common/PageLayout";
import { useContext, useEffect, useState } from "react";
import { PostsList } from "../../components/Post/PostList";
import { getAllPosts, PostData } from "../../queries/post";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { FilterBar } from "./FilterBar";

export const PostsPage: React.FC = () => {
  const [postList, setPostList] = useState<PostData[]>([]);
  const [filterPostList, setFilterPostList] = useState<PostData[]>([]);
  const [userFilter, setUserFilter] = useState<string>("");
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("");
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
        setFilterPostList(response.data);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(" משהו השתבש!");
    }
  };

  const onFilter = (user: string, contentType: string) => {
    setUserFilter(user);
    setContentTypeFilter(contentType);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let tempPost: PostData[] = postList;
    if (userFilter) {
      tempPost = tempPost.filter(
        (post: PostData) => post?.sender === userFilter
      );
    }
    if (userFilter === "" && contentTypeFilter === "") {
      setFilterPostList([...postList]);
      return;
    }
    if (contentTypeFilter !== "") {
      tempPost = tempPost.filter((post: PostData) =>
        post?.content.toLowerCase().includes(contentTypeFilter.toLowerCase())
      );
    }
    setFilterPostList([...tempPost]);
  }, [userFilter, contentTypeFilter]);

  return (
    <PageLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          width: "95%",
          justifyContent: "space-around",
        }}
      >
        <FilterBar
          setUserFilter={setUserFilter}
          setContentTypeFilter={setContentTypeFilter}
          onFilter={onFilter}
        />
        {filterPostList ? (
          <PostsList showLikes={true} postList={filterPostList} />
        ) : null}
      </div>
    </PageLayout>
  );
};
