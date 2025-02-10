import {
  Card,
  Typography,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Stack,
  styled,
  Box,
  Avatar,
} from "@mui/material";
import { PostData } from "../../queries/post";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CommentsDialog from "../Common/Comments/CommentsDialog";

interface PostCardProps {
  post: PostData;
  setRefresh: (flag: boolean) => any;
  showAction?: boolean;
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  margin: "0 auto",
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
}));

export const PostCard: React.FC<PostCardProps> = ({
  post,
  setRefresh,
  showAction = false,
}) => {
  const { connectedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const accessToken = connectedUser?.accessToken;
  const [isAlreadyLiked, setIsAlreadyLiked] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<PostData>(post);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

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
      setRefresh(true);
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

  return (
    <StyledCard>
      <CardContent>
        <Stack direction='row' alignItems='center' spacing={1} mb={2}>
          <Avatar
            sx={{ bgcolor: "primary.light", width: 32, height: 32 }}
            src={currentPost.senderData.image ?? currentPost.senderData.name}
          />
          <Typography variant='body2' color='text.secondary'>
            {currentPost.senderData.name}
          </Typography>
        </Stack>

        {currentPost.image && (
          <CardMedia component='img' height='194' image={currentPost.image} />
        )}

        <Box mb={1}>
          <Typography variant='h6' gutterBottom>
            {currentPost.title}
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            {currentPost.content}
          </Typography>
        </Box>

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ display: "block", textAlign: "right" }}>
          {new Date(currentPost.date).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Stack direction='row' spacing={1}>
          {showAction && (
            <>
              <IconButton size='small' onClick={onEditClick}>
                <EditIcon fontSize='small' />
              </IconButton>
              <IconButton size='small' onClick={onDeleteClick}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </>
          )}
        </Stack>

        <Stack direction='row' spacing={2} alignItems='center'>
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <IconButton
              aria-label='show comments'
              onClick={() => setOpenCommentDialog(true)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant='body2' color='text.secondary'>
              {currentPost.numOfComments || 0}
            </Typography>
          </Stack>

          <Stack direction='row' spacing={0.5} alignItems='center'>
            <IconButton size='small' onClick={onLikeClick}>
              <FavoriteIcon
                fontSize='small'
                color={isAlreadyLiked ? "error" : "action"}
              />
            </IconButton>
            <Typography variant='body2' color='text.secondary'>
              {currentPost.numOfLikes || 0}
            </Typography>
          </Stack>
        </Stack>
      </CardActions>
      <CommentsDialog
        open={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        postId={post._id}
      />
    </StyledCard>
  );
};
