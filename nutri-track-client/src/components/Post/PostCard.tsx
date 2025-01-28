import {
  Card,
  Typography,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { createLike, findOneLike, removeLike } from "../../queries/like";
import { useContext, useEffect, useState } from "react";
import { updatePost } from "../../queries/post";
import { UserContext } from "../../context/UserContext";

export interface PostData {
  _id: string;
  title: string;
  content: string;
  image?: string;
  sender: string;
  numOfLikes?: number;
  date: Date;
}

interface PostCardProps extends PostData {
  showLikes: boolean;
}

export const PostCard: React.FC<PostCardProps > = ({
  _id,
  title,
  content,
  image,
  sender,
  numOfLikes,
  date,
  showLikes,
}) => {
  const {connectedUser } = useContext(UserContext);
  const accessToken = connectedUser?.accessToken;
  const [isAlreadyLiked, setIsAlreadyLiked]= useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(numOfLikes || 0)
  const [currentPost, setCurrentPost]= useState<PostData>({
    _id,
    title,
    content,
    image,
    sender,
    numOfLikes,
    date
  } );

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
      const response = await removeLike({ postId: _id, userId: userId}, accessToken);
        setLikesCount((prev) => prev -1)
 
      setIsAlreadyLiked(false)
    } else {
      const response = await createLike({ postId: _id, userId: userId}, accessToken);
      setLikesCount((prev) => prev + 1)
      setIsAlreadyLiked(true)
    }
  };

  const initAlreadyLike = async ()=>{
    const userId = connectedUser?.id;

    if (!accessToken) {
      console.log("No access token found");
      return;
    }
    if (!userId) {
      console.log("No user id found");
      return;
    }
    const response = await findOneLike({ postId: _id, userId: userId}, accessToken);
    
    setIsAlreadyLiked(response!!)
  }

  useEffect(() => {
    initAlreadyLike()
  }, []);

  useEffect(() => {
    const update = async () => {
    if (!accessToken) {
      console.log("No access token found");
      return;
    }

      const updateRes = await updatePost({...currentPost, numOfLikes:likesCount}, _id, accessToken);
      setCurrentPost(updateRes.data);
    }
    update()
  
  }, [likesCount])

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
      {showLikes && (
        <CardActions disableSpacing>
          <IconButton aria-label="like post" onClick={onLikeClick}>
            <FavoriteIcon color={isAlreadyLiked ? "error" : "inherit"} />
          </IconButton>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {currentPost.numOfLikes ? `${currentPost.numOfLikes} likes`: "No likes yet"}
          </Typography>
        </CardActions>
      )}
    </Card>
  ) : null;
};
