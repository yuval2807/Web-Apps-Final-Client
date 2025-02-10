import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Comment } from "../../../queries/comment";

interface CommentProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Box sx={{ mb: 2, maxHeight: "60vh", overflowY: "auto" }}>
      <Box
        key={comment.id}
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          alignItems: "flex-start",
          flexDirection: "row-reverse",
        }}>
        <Avatar
          sx={{ bgcolor: "primary.main" }}
          src={comment.user.image ? comment.user.image : comment.user.name}
        />
        <Box sx={{ textAlign: "right" }}>
          <Typography variant='subtitle2'>{comment.user.name}</Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ wordBreak: "break-word" }}>
            {comment.message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentCard;
