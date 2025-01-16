import {
  Card,
  Typography,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material";

export interface PostData {
  title: string;
  content: string;
  image?: string;
  date: Date;
}

export const PostCard: React.FC<PostData> = ({
  title,
  content,
  image,
  date,
}) => {
  return title || content ? (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <CardHeader
        title={title}
        subheader={new Date(date).toLocaleDateString()}
      />
      {image && (
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
      )}
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};
