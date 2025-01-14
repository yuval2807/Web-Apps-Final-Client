import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";

interface NewPostFormProps {
    title: string,
    content: string,
    image?: string,
    setTitle: (title: string) => void,
    setContent: (content: string) => void,
    setImage: (image: string) => void,
    onSubmit: () => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ title, content, image, setTitle, setContent, setImage, onSubmit }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit();
    } catch (err) {
      setError("Invalid fields");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant='h5' component='h1' gutterBottom align='center'>
          New post
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin='normal'
            label='Post Title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin='normal'
            label='Post Content'
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            inputProps={{ minLength: 6 }}
            autoComplete='current-password'
          />
          <TextField
            fullWidth
            margin='normal'
            label='Image URL'
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            inputProps={{ minLength: 6 }}
          />
          {error && (
            <Alert severity='error' sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={loading}
            sx={{ mt: 3 }}>
            {loading ? "Creating..." : "Create post"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;
