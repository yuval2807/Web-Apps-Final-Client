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
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  createLike,
  findOneLike,
  getLikeCount,
  removeLike,
} from "../../queries/like";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect, useState } from "react";
import { deletePost } from "../../queries/post";
import { UserContext } from "../../context/UserContext";
import CommentsDialog from "../Common/Comments/CommentsDialog";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: PostData;
  showLikes: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, showLikes }) => {
  const { connectedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const accessToken = connectedUser?.accessToken;
  const [isAlreadyLiked, setIsAlreadyLiked] = useState<boolean>(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
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

  const onEditClick = async () => {
    navigate(`/post/edit/${post._id}`, { state: currentPost });
  };

  const onDeleteClick = async () => {
    if (!accessToken) {
      console.log("No access token found");
      return;
    }

    const response = await deletePost(post._id, accessToken);
    if (response.status === 200) {
      console.log("Post deleted");
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

  return !!post ? (
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
          <IconButton
            aria-label='show comments'
            onClick={() => setOpenCommentDialog(true)}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton aria-label='like post' onClick={onLikeClick}>
            <FavoriteIcon color={isAlreadyLiked ? "error" : "inherit"} />
          </IconButton>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            {currentPost?.numOfLikes
              ? `${currentPost.numOfLikes} likes`
              : "No likes yet"}
          </Typography>
          {connectedUser?.id === currentPost.sender && (
            <>
              <IconButton aria-label='like post' onClick={onEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label='like post' onClick={onDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      )}
      <CommentsDialog
        open={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        postId={post._id}
      />
    </Card>
  ) : null;
};
