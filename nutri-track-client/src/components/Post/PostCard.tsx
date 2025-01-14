import { Card, Typography, CardHeader, CardMedia, CardContent } from "@mui/material";

export interface PostData {
    title: string;
    content: string;
    image?: string;
}

export const PostCard: React.FC<PostData> = ({title, content, image}) => {

  return (
    (title || content) ?
    (<Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
        <CardHeader
            title={title}
            subheader={new Date().toLocaleDateString()}
        />
        {image && 
        <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
        />}
        <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {content}
            </Typography>
        </CardContent>
    </Card>) : null
  );
};
