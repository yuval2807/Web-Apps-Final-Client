import PageLayout from "../../components/Common/PageLayout";
import { useContext, useEffect, useState } from "react";
import { PostsList } from "../../components/Post/PostList";
import { PostData } from "../../components/Post/PostCard";
import { getAllPosts } from "../../queries/post";
import { UserContext } from "../../context/UserContext";
import { FilterBar } from "./FilterBar";

export const PostsPage: React.FC = () => {
  const [postList, setPostList] = useState<PostData[]>([]);
  const [filterPostList, setFilterPostList] = useState<PostData[]>([]);
  const [userFilter, setUserFilter] = useState<string>("");
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("");
  const {connectedUser } = useContext(UserContext);

  const fetchPosts = async () => {
    try {
        const accessToken = connectedUser?.accessToken;

        if (!accessToken) {
          console.log("No access token found");
          return;
        }
  
      const response = await getAllPosts(accessToken);
      if (response.status === 200) {
        console.log("Query success");
        setPostList(response.data);
        setFilterPostList(response.data);
      }
    } catch (error) {
      console.log("error: ", error);
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
    // if (userFilter) {
    //   tempPost = tempPost.filter((post: PostData) => post?.sender === userFilter);
    // }
    if(userFilter === "" && contentTypeFilter === "") {
      setFilterPostList([...postList]);
      return;
    }
    if (contentTypeFilter !== "") {
      tempPost = tempPost.filter((post: PostData) => post?.content.toLowerCase().includes(contentTypeFilter.toLowerCase()));
    }
    setFilterPostList([...tempPost]);
  }, [userFilter, contentTypeFilter]);

  return (
    <PageLayout>
      <div style={{display: "flex", flexDirection: "row-reverse", width: "95%", justifyContent:"space-around"  }}>
        <FilterBar setUserFilter={setUserFilter} setContentTypeFilter={setContentTypeFilter} onFilter={onFilter}  />
        {filterPostList ? (<PostsList postList={filterPostList}/>) : null }
        </div>
    </PageLayout>
  );
};
