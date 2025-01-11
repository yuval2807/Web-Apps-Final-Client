import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Common/PageLayout";
import NewPostForm from "./PostForm";
import PostPreview from "./PostPreview";
import { useState } from "react";

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handlePressCreate = async (email: string, password: string) => {
    // Add your authentication logic here
    // For demo, just navigate to home
    navigate("/home");
  };

  return (
    <PageLayout>
        <NewPostForm title={title} content={content} image={image} setTitle={setTitle} setContent={setContent} setImage={setImage} onSubmit={handlePressCreate} />
        <PostPreview title={title} content={content} image={image} />
    </PageLayout>
  );
};
