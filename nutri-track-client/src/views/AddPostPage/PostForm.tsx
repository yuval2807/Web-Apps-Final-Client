import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  Paper,
  Stack,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 500,
  margin: "0 auto",
  borderRadius: theme.spacing(2),
}));

const ImagePlaceholder = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 200,
  backgroundColor: theme.palette.grey[200],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Shape = styled(Box)<{ shape?: "circle" | "square" | "triangle" }>(
  ({ theme, shape }) => ({
    width: 40,
    height: 40,
    backgroundColor: theme.palette.grey[400],
    ...(shape === "circle" && {
      borderRadius: "50%",
    }),
    ...(shape === "triangle" && {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderLeft: "20px solid transparent",
      borderRight: "20px solid transparent",
      borderBottom: `40px solid ${theme.palette.grey[400]}`,
    }),
  })
);

interface NewPostFormProps {
  title: string;
  content: string;
  image: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setImage: (image: string) => void;
  setImgFile: (image: File) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

const PostCreationForm: React.FC<NewPostFormProps> = ({
  title,
  content,
  image,
  setTitle,
  setContent,
  setImage,
  setImgFile,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const date = new Date().toDateString();
  const { connectedUser } = useContext(UserContext);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newURL = URL.createObjectURL(e.target.files[0]);
      setImage(newURL);
      setImgFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      onSubmit();
    } catch (err) {}
  };

  return (
    <StyledPaper elevation={1}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "primary.light",
            fontSize: "0.875rem",
          }}>
          {connectedUser?.name}
        </Avatar>
        <Typography variant='body2' color='text.secondary'>
          {connectedUser?.name}
        </Typography>
      </Box>

      <Stack spacing={1}>
        <Box>
          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Post Title'
            variant='outlined'
            size='small'
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
            <Typography variant='caption' color='text.secondary'>
              {date}
            </Typography>
          </Box>
        </Box>

        <label
          htmlFor='photo-upload'
          style={{
            cursor: "pointer",
          }}>
          <input
            id='photo-upload'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {image ? (
            <CardMedia component='img' height='194' image={image} />
          ) : (
            <ImagePlaceholder>
              <Shape shape='triangle' />
              <Shape shape='square' />
              <Shape shape='circle' />
            </ImagePlaceholder>
          )}
        </label>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Post Content'
          variant='outlined'
        />

        <Stack direction='row' spacing={1} sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={onSubmit}>
            create post
          </Button>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={onCancel}>
            cancel
          </Button>
        </Stack>
      </Stack>
    </StyledPaper>
  );
};

export default PostCreationForm;
