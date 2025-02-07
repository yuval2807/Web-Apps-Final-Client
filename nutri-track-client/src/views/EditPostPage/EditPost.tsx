import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/Common/PageLayout";
import NewPostForm from "../AddPostPage/PostForm";
import PostPreview from "../AddPostPage/PostPreview";
import { useContext, useState } from "react";
import { updatePost } from "../../queries/post";
import { UserContext } from "../../context/UserContext";
import { Typography } from "@mui/material";

export const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const { connectedUser } = useContext(UserContext);
  const params = useParams();
  const postId = params.postid;
  const location = useLocation();
  const post = location.state;
  const [title, setTitle] = useState<string>(post?.title);
  const [content, setContent] = useState<string>(post?.content);
  const [image, setImage] = useState<string>(post?.image);

  const handlePressUpdate = async () => {
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const payload = {
        title,
        content,
        image,
        date: new Date(),
        sender: connectedUser?.id,
      };

      const response = await updatePost(payload, postId!, accessToken);

      if (response.status === 200) {
        console.log("Post updated");
        navigate("/post");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <PageLayout>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Edit post
      </Typography>
      <NewPostForm
        title={title}
        content={content}
        image={image}
        setTitle={setTitle}
        setContent={setContent}
        setImage={setImage}
        onSubmit={handlePressUpdate}
        isEdit={true}
      />
      <PostPreview title={title} content={content} image={image} />
    </PageLayout>
  );
};
