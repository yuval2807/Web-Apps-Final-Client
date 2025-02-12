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
import { z } from "zod";

interface UserDetailsProps {
  user: UserInfo;
  onSave: (data: UserInfo) => Promise<UserInfo | undefined>;
}

const genderOptions: Option[] = [
  { label: "male", value: "male" },
  { label: "female", value: "female" },
  { label: "other", value: "other" },
];

// Define a validation schema using Zod
const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Invalid gender" }),
  }),
  height: z.coerce.number().positive("Height must be a positive number"),
  weight: z.coerce.number().positive("Weight must be a positive number"),
  image: z.string().url("Invalid image URL").optional(),
});

const UserDetails: React.FC<UserDetailsProps> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserInfo>(user);
  const [editedProfile, setEditedProfile] = useState<UserInfo>(profile);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof UserInfo, string>>>(
    {}
  );

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
      const validationResult = userSchema.safeParse({
        ...editedProfile,
        image: url,
      });

      if (!validationResult.success) {
        const fieldErrors = validationResult.error.format();
        setErrors({
          name: fieldErrors.name?._errors[0],
          gender: fieldErrors.gender?._errors[0],
          height: fieldErrors.height?._errors[0],
          weight: fieldErrors.weight?._errors[0],
          image: fieldErrors.image?._errors[0],
        });
        return;
      }

      setErrors({});
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
    setErrors({});
  };

  const handleChange =
    (field: keyof UserInfo) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditedProfile((prev) => ({ ...prev, [field]: event.target.value }));
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
              <label htmlFor='photo-upload' style={{ cursor: "pointer" }}>
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
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
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
            error={!!errors.name}
            helperText={errors.name}
          />
          <RadioGroupButtons
            label='Gender'
            name='gender'
            row
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
                error={!!errors.height}
                helperText={errors.height}
                type='number'
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
                type='number'
                error={!!errors.weight}
                helperText={errors.weight}
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
