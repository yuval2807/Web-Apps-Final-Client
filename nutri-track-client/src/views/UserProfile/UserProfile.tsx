import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Grid2 as Grid } from "@mui/material";
import PageLayout from "../../components/Common/PageLayout";
import ToggleButton from "../../components/ToggleButtons";
import { UserContext } from "../../context/UserContext";
import UserDetails from "./UserDetails";
import { getUserById, updateUserById, User } from "../../queries/user";
import { getAllPosts, PostData } from "../../queries/post";
import { UserInfo } from "./types";
import { PostsList } from "../../components/Post/PostList";

const UserProfile: React.FC = () => {
  const { connectedUser } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(null);
  const [postList, setPostList] = useState<PostData[]>([]);

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
    }
  };

  const fetchUserPosts = async () => {
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const response = await getAllPosts(accessToken, connectedUser.id);
      if (response) {
        console.log("Query success");
        setPostList(response);
      }
    } catch (error) {
      console.log("error: ", error);
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
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserPosts();
  }, [connectedUser]);

  return (
    <PageLayout>
      <Container maxWidth='md'>
        <Box sx={{ p: 3 }}>
          {user ? <UserDetails user={user} onSave={handleUserUpdate} /> : null}
        </Box>
        <PostsList postList={postList} />
      </Container>
    </PageLayout>
  );
};

export default UserProfile;
