import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Avatar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./CommentCard";

interface Comment {
  id: number;
  user: string;
  text: string;
  avatar: string;
}

interface CommentsDialogProps {
  open: boolean;
  onClose: () => void;
}

const CommentsDialog: React.FC<CommentsDialogProps> = ({ open, onClose }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [comments] = useState<Comment[]>([
    { id: 1, user: "User A", text: "First comment", avatar: "A" },
    { id: 2, user: "User B", text: "Second comment", avatar: "B" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("");
    }
  };

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
            <Comment comment={comment} />
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
            שלח
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
