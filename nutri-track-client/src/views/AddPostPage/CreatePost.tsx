import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Common/PageLayout";
import NewPostForm from "./PostForm";
import PostPreview from "./PostPreview";
import { useState } from "react";
import { createPost } from "../../queries/post";

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handlePressCreate = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.log("No access token found");
          return;
        }

        const payload = { title, content, image, sender: "6782a8eb3ebe51f5c3c03079" }; //TODO: get sender from user context

        const response = await createPost(payload, accessToken);

        if (response.status === 200) {
          console.log("Post created");
          navigate("/home");
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
