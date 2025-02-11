import React, { useContext, useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import PageLayout from "../../components/Common/PageLayout";
import { UserContext } from "../../context/UserContext";
import UserDetails from "./UserDetails";
import { getUserById, updateUserById, User } from "../../queries/user";
import { getAllPosts, PostData } from "../../queries/post";
import { UserInfo } from "./types";
import { PostsList } from "../../components/Post/PostList";
import { toast } from "react-toastify";

const UserProfile: React.FC = () => {
  const { connectedUser } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(null);
  const [postList, setPostList] = useState<PostData[]>([]);
  const [refresh, setRefresh] = useState(false);

  const fetchUserInfo = async () => {
    if (!connectedUser) return;

    try {
      const response: User = await getUserById(
        connectedUser.accessToken,
        connectedUser.id
      );
      setUser(response);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error(" משהו השתבש!");
    }
  };

  const fetchUserPosts = async () => {
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const { posts } = await getAllPosts(accessToken, 0, connectedUser.id);
      if (posts) {
        setPostList(posts);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(" משהו השתבש!");
    }
  };

  const handleUserUpdate = async (data: UserInfo) => {
    if (!connectedUser) return;

    try {
      return await updateUserById(
        connectedUser.accessToken,
        connectedUser?.id,
        data
      );
    } catch (error) {
      console.log("error: ", error);
      toast.error(" משהו השתבש!");
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserPosts();
  }, [connectedUser, refresh]);

  return (
    <PageLayout>
      <Container maxWidth='md'>
        <Box sx={{ p: 3 }}>
          {user ? <UserDetails user={user} onSave={handleUserUpdate} /> : null}
        </Box>
        <PostsList
          postList={postList}
          direction='row'
          setRefresh={setRefresh}
          showAction={true}
        />
      </Container>
    </PageLayout>
  );
};

export default UserProfile;
