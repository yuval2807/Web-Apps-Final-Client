import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { PostData } from "../../../queries/post";
import { toast } from "react-toastify";
import {
  Comment,
  createComment,
  getCommentsByPostId,
} from "../../../queries/comment";
import { UserContext } from "../../../context/UserContext";
import CommentCard from "./CommentCard";

interface CommentsDialogProps {
  open: boolean;
  onClose: () => void;
  postId: PostData["_id"];
}

const CommentsDialog: React.FC<CommentsDialogProps> = ({
  open,
  onClose,
  postId,
}) => {
  const { connectedUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    if (!connectedUser) return;

    try {
      const response: Comment[] = await getCommentsByPostId(
        postId,
        connectedUser.accessToken
      );
      setComments(response);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      toast.error(" משהו השתבש!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newComment.trim()) {
        // Add comment logic here
        if (connectedUser) {
          await createComment(
            {
              user: connectedUser?.id,
              message: newComment,
              post: postId,
            },
            connectedUser?.accessToken
          );
        }

        await fetchComments();
        setNewComment("");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(" משהו השתבש!");
    }
  };

  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [connectedUser, postId, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Comments
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2, maxHeight: "60vh", overflowY: "auto" }}>
          {comments.map((comment) => (
            <CommentCard comment={comment} />
          ))}
        </Box>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            gap: 1,
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
            pt: 2,
            flexDirection: "row-reverse",
          }}>
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='הוסף תגובה...'
            variant='outlined'
            size='small'
            fullWidth
            autoFocus
          />
          <Button
            type='submit'
            variant='contained'
            startIcon={<SendIcon />}
            disabled={!newComment.trim()}>
            send
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
