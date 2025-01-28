import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Common/PageLayout";
import NewPostForm from "./PostForm";
import PostPreview from "./PostPreview";
import { useContext, useState } from "react";
import { createPost } from "../../queries/post";
import { UserContext } from "../../context/UserContext";

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const {connectedUser } = useContext(UserContext);

  const handlePressCreate = async () => {
      try {
        const accessToken = connectedUser?.accessToken;

        if (!accessToken) {
          console.log("No access token found");
          return;
        }

        const payload = { title, content, image, date: new Date(), sender: connectedUser?.id };

        const response = await createPost(payload, accessToken);

        if (response.status === 200) {
          console.log("Post created");
          navigate("/post");
        }
      } catch (error) {
        console.log("error: ", error);
      }
      };

  return (
    <PageLayout>
        <NewPostForm title={title} content={content} image={image} setTitle={setTitle} setContent={setContent} setImage={setImage} onSubmit={handlePressCreate} />
        <PostPreview title={title} content={content} image={image} />
    </PageLayout>
  );
};
