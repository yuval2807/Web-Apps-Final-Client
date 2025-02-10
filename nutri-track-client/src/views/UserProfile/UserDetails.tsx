import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Avatar,
  Container,
  Grid2 as Grid,
  InputAdornment,
  CardMedia,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import RadioGroupButtons, {
  Option,
} from "../../components/RadioGroup/RadioGroup";
import PageLayout from "../../components/Common/PageLayout";
import { UserInfo } from "./types";
import { toast } from "react-toastify";
import { uploadImg } from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";

interface UserDetailsProps {
  user: UserInfo;
  onSave: (data: UserInfo) => Promise<UserInfo | undefined>;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserInfo>(user);
  const [editedProfile, setEditedProfile] = useState<UserInfo>(profile);
  const [imgFile, setImgFile] = useState<File>();
  const { connectedUser } = useContext(UserContext);

  const genderOptions: Option[] = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "other", value: "other" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newURL = URL.createObjectURL(e.target.files[0]);

      setEditedProfile((prev) => ({
        ...prev,
        image: newURL,
      }));

      setImgFile(e.target.files[0]);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    try {
      const url: string | undefined = await uploadImg(imgFile!!);

      setEditedProfile({ ...editedProfile, image: url ? url : "" });

      const updatedUser = await onSave({
        ...editedProfile,
        image: url ? url : "",
      });

      if (updatedUser) {
        setProfile(editedProfile);
        setIsEditing(false);
        toast.success("משתמש עודכן בהצלחה!");
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(" משהו השתבש!");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleChange =
    (field: keyof UserInfo) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditedProfile((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <PageLayout>
      <Container maxWidth='md' sx={{ width: "80%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mr: 2 }}>
              <label
                htmlFor='photo-upload'
                style={{
                  cursor: "pointer",
                }}>
                <input
                  id='photo-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  disabled={!isEditing}
                  style={{ display: "none" }}
                />
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt={profile.name}
                  src={isEditing ? editedProfile.image : profile.image}
                />
              </label>
            </Box>
            <Typography variant='subtitle1' color='text.secondary'>
              {profile.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}>
            {!isEditing ? (
              <IconButton
                color='primary'
                onClick={handleEdit}
                aria-label='edit profile'>
                <EditIcon />
              </IconButton>
            ) : (
              <Box>
                <Button
                  startIcon={<SaveIcon />}
                  variant='contained'
                  onClick={handleSave}
                  sx={{ mr: 1 }}>
                  Save
                </Button>
                <Button
                  startIcon={<CancelIcon />}
                  variant='outlined'
                  onClick={handleCancel}
                  color='error'>
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField
            label='Full Name'
            variant='outlined'
            fullWidth
            value={isEditing ? editedProfile.name : profile.name}
            onChange={handleChange("name")}
            disabled={!isEditing}
          />
          <RadioGroupButtons
            label='gender'
            name='gender'
            row={true}
            options={genderOptions}
            value={isEditing ? editedProfile.gender : profile.gender}
            onChange={handleChange("gender")}
            disabled={!isEditing}
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={6}>
              <TextField
                label='Height'
                name='height'
                value={isEditing ? editedProfile.height : profile.height}
                onChange={handleChange("height")}
                disabled={!isEditing}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>cm</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label='Weight'
                name='weight'
                value={isEditing ? editedProfile.weight : profile.weight}
                onChange={handleChange("weight")}
                disabled={!isEditing}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>kg</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </PageLayout>
  );
};

export default UserDetails;
