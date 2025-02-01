import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Common/PageLayout";
import NewPostForm from "./PostForm";
import PostPreview from "./PostPreview";
import { useContext, useState } from "react";
import { createPost } from "../../queries/post";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const { connectedUser } = useContext(UserContext);

  const handlePressCreate = async () => {
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
        sender: "6782a8eb3ebe51f5c3c03079",
      }; //TODO: get sender from user context

      const response = await createPost(payload, accessToken);

      if (response.status === 200) {
        toast.success("Post created successfully!");
        navigate("/home");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <PageLayout>
      <NewPostForm
        title={title}
        content={content}
        image={image}
        setTitle={setTitle}
        setContent={setContent}
        setImage={setImage}
        onSubmit={handlePressCreate}
      />
      <PostPreview title={title} content={content} image={image} />
    </PageLayout>
  );
};
