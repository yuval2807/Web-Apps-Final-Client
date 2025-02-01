import React, { useState } from "react";
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
} from "@mui/material";
import PageLayout from "../../components/Common/PageLayout";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import RadioGroupButtons, {
  Option,
} from "../../components/RadioGroup/RadioGroup";
import ToggleButton from "../../components/ToggleButtons";
import { updateUserById, User } from "../../queries/user";
import { UserInfo } from "./types";

interface UserDetailsProps {
  user: UserInfo;
  onSave: (data: UserInfo) => Promise<UserInfo | undefined>;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserInfo>(user);

  const [editedProfile, setEditedProfile] = useState<UserInfo>(profile);

  const genderOptions: Option[] = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "other", value: "other" },
  ];

  const fitLevelOptions: Option[] = [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await onSave(editedProfile);
      if (!!updatedUser) {
        setProfile(editedProfile);
        setIsEditing(false);
      }
    } catch (err: any) {
      console.error(err.message);
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
      <Container maxWidth='md'>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}>
            <Typography variant='h4' component='h1'>
              User Profile
            </Typography>
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
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Avatar
                  sx={{ width: 100, height: 100, mr: 2 }}
                  alt={profile.name}
                  src='/api/placeholder/100/100'
                />
                <Typography variant='subtitle1' color='text.secondary'>
                  Profile Picture
                </Typography>
              </Box>
            </Grid>
            <Grid size={6}>
              <Stack spacing={3}>
                <TextField
                  label='Email'
                  type='email'
                  variant='outlined'
                  fullWidth
                  value={profile.email}
                  disabled={true}
                />
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
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default UserDetails;
