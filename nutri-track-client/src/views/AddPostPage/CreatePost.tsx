import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Common/PageLayout";
import NewPostForm from "./PostForm";
import { useContext, useState } from "react";
import { createPost } from "../../queries/post";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { uploadImg } from "../../utils/uploadImage";

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imgFile, setImgFile] = useState<File>();
  const { connectedUser } = useContext(UserContext);

  const handlePressCreate = async () => {
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const url: string | undefined = await uploadImg(imgFile!!);
      setImage(url ? url : image);

      const payload = {
        title,
        content,
        image: url ? url : image,
        date: new Date(),
        sender: connectedUser?.id,
      };

      const response = await createPost(payload, accessToken);

      if (response.status === 200) {
        toast.success("פוסט נוצר בהצלחה!");
        navigate("/post");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(" משהו השתבש!");
    }
  };

  return (
    <PageLayout>
      <Typography variant='h5' component='h1' gutterBottom align='center'>
        New post
      </Typography>
      <NewPostForm
        title={title}
        content={content}
        image={image}
        setTitle={setTitle}
        setContent={setContent}
        setImage={setImage}
        setImgFile={setImgFile}
        onSubmit={handlePressCreate}
      />
    </PageLayout>
  );
};
