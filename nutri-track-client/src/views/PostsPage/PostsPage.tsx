import PageLayout from "../../components/Common/PageLayout";
import { useContext, useEffect, useRef, useState } from "react";
import { PostsList } from "../../components/Post/PostList";
import { getAllPosts, PostData } from "../../queries/post";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { FilterBar } from "./FilterBar";

export const PostsPage: React.FC = () => {
  const [postList, setPostList] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const [filterPostList, setFilterPostList] = useState<PostData[]>([]);
  const [userFilter, setUserFilter] = useState<string>("");
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("");
  const { connectedUser } = useContext(UserContext);

  const fetchPosts = async () => {
    if (hasMore === false) return;
    setLoading(true);
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const { posts, totalPages } = await getAllPosts(accessToken, page);
      if (posts) {
        setLoading(false);
        setPostList((prevPosts) => [...prevPosts, ...posts]);
        setFilterPostList((prevPosts) => [...prevPosts, ...posts]);
        setHasMore(page < totalPages);
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

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
      <div  style={{ display: "flex", flexDirection: "column", width: "95%"}}>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        > */}
          <FilterBar
            setUserFilter={setUserFilter}
            setContentTypeFilter={setContentTypeFilter}
            onFilter={onFilter}
          />
          {filterPostList ? (
            <PostsList showLikes={true} postList={filterPostList} />
          ) : null}
        {/* </div> */}
        {loading && <div>Loading more posts...</div>}
        <div ref={observerTarget}></div>
      </div>
    </PageLayout>
  );
};
