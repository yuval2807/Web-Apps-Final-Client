import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Box,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postImage } from "../../queries/imageServer";
import { UserContext } from "../../context/UserContext";

interface NewPostFormProps {
  title: string;
  content: string;
  image?: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setImage: (image: string) => void;
  onSubmit: () => void;
  isEdit?: boolean;
}

const NewPostForm: React.FC<NewPostFormProps> = ({
  title,
  content,
  image,
  setTitle,
  setContent,
  setImage,
  onSubmit,
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const { connectedUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgFile, setImgFile] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newURL = URL.createObjectURL(e.target.files[0]);
      setImage(newURL);
      setImgFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await uploadImg(imgFile!!);

    try {
      await onSubmit();
    } catch (err) {
      setError("Invalid fields");
    } finally {
      setLoading(false);
    }
  };

  const uploadImg = async (file: File) => {
    const formData = new FormData();
    const accessToken = connectedUser?.accessToken;

    if (!accessToken) {
      console.log("No access token found");
      return;
    }

    if (file) {
      formData.append("file", file);
      postImage(formData, accessToken)
        .then((res) => {
          const url = res.data.url;
          setImage(url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Post Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Post Content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            inputProps={{ minLength: 6 }}
            autoComplete="current-password"
          />
          <TextField
            fullWidth
            margin="normal"
            // label='Image URL'
            type="file"
            value={""}
            onChange={handleImageChange}
            inputProps={{ minLength: 6 }}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </CardContent>
      <CardActions>
        {isEdit ? (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? "Updateing..." : "Update post"}
            </Button>
            <Button
              variant="contained"
              disabled={loading}
              onClick={() => navigate("/post")}
              sx={{ mt: 3 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Creating..." : "Create post"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default NewPostForm;
