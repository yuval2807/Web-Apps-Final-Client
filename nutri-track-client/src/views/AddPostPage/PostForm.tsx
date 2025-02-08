import React, { useState } from "react";
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

interface NewPostFormProps {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setImage: (image: string) => void;
  setImgFile: (image: File) => void;
  onSubmit: () => void;
  isEdit?: boolean;
}

const NewPostForm: React.FC<NewPostFormProps> = ({
  title,
  content,
  setTitle,
  setContent,
  setImage,
  setImgFile,
  onSubmit,
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    try {
      onSubmit();
    } catch (err) {
      setError("Invalid fields");
    } finally {
      setLoading(false);
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
