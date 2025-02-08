import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardMedia,
} from "@mui/material";

interface PostPreviewProps {
  title: string;
  content: string;
  image?: string;
}

const PostPreview: React.FC<PostPreviewProps> = ({ title, content, image }) => {
  return title || content ? (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography>Post Preview</Typography>
      <CardHeader title={title} />
      {image && (
        <CardMedia
          component='img'
          height='194'
          image={image}
          alt='Paella dish'
        />
      )}
      <CardContent>
        <Typography variant='body2' sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};

export default PostPreview;
