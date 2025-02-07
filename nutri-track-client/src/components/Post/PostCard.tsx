import {
  Card,
  Typography,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { PostData } from "../../queries/post";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  createLike,
  findOneLike,
  getLikeCount,
  removeLike,
} from "../../queries/like";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

interface PostCardProps {
  post: PostData;
  showLikes: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, showLikes }) => {
  const { connectedUser } = useContext(UserContext);
  const accessToken = connectedUser?.accessToken;
  const [isAlreadyLiked, setIsAlreadyLiked] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<PostData>(post);

  const onLikeClick = async () => {
    const userId = connectedUser?.id;

    if (!accessToken) {
      console.log("No access token found");
      return;
    }
    if (!userId) {
      console.log("No user id found");
      return;
    }
    if (isAlreadyLiked) {
      const response = await removeLike(
        { postId: post?._id, userId: userId },
        accessToken
      );
      const updatedLikesCount = await getLikeCount(
        currentPost?._id,
        accessToken
      );
      setCurrentPost({ ...currentPost, numOfLikes: updatedLikesCount });
      setIsAlreadyLiked(false);
    } else {
      const response = await createLike(
        { postId: post?._id, userId: userId },
        accessToken
      );
      const updatedLikesCount = await getLikeCount(
        currentPost?._id,
        accessToken
      );
      setCurrentPost({ ...currentPost, numOfLikes: updatedLikesCount });
      setIsAlreadyLiked(true);
    }
  };

  const initAlreadyLike = async () => {
    const userId = connectedUser?.id;

    if (!accessToken) {
      console.log("No access token found");
      return;
    }
    if (!userId) {
      console.log("No user id found");
      return;
    }
    const response = await findOneLike(
      { postId: post?._id, userId: userId },
      accessToken
    );

    setIsAlreadyLiked(response!!);
  };

  useEffect(() => {
    initAlreadyLike();
  }, []);

  return post?.title || post?.content ? (
    <Card sx={{ width: "90%", maxWidth: 500, mx: "auto", mt: 4 }}>
      <CardHeader
        title={post.title}
        subheader={new Date(post.date).toLocaleDateString()}
      />
      {post.image && (
        <CardMedia
          component='img'
          height='194'
          image={post.image}
          alt='Paella dish'
        />
      )}
      <CardContent>
        <Typography variant='body2' sx={{ color: "text.secondary" }}>
          {post.content}
        </Typography>
      </CardContent>
      {showLikes && (
        <CardActions disableSpacing>
          <IconButton aria-label='like post' onClick={onLikeClick}>
            <FavoriteIcon color={isAlreadyLiked ? "error" : "inherit"} />
          </IconButton>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            {currentPost?.numOfLikes
              ? `${currentPost.numOfLikes} likes`
              : "No likes yet"}
          </Typography>
        </CardActions>
      )}
    </Card>
  ) : null;
};
