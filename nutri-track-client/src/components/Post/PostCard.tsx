import {
  Card,
  Typography,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material";
import { PostData } from "../../queries/post";

export const PostCard: React.FC<PostData> = ({
  title,
  content,
  image,
  date,
}) => {
  return title || content ? (
    <Card sx={{ width: "90%", maxWidth: 500, mx: "auto", mt: 4 }}>
      <CardHeader
        title={title}
        subheader={new Date(date).toLocaleDateString()}
      />
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
