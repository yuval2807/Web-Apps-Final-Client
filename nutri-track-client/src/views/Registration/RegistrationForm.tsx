import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Grid2 as Grid,
  InputAdornment,
  Avatar,
} from "@mui/material";
import RadioGroupButtons, {
  Option,
} from "../../components/RadioGroup/RadioGroup";
import ToggleButton from "../../components/ToggleButtons";
import { User } from "../../queries/user";
import { z } from "zod";

// Define the Zod schema
const registrationSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  fitLevel: z.enum(["Beginner", "Intermediate", "Advanced"], {
    errorMap: () => ({ message: "Please select a fitness level" }),
  }),
  height: z
    .number()
    .min(1, "Height must be greater than 0")
    .max(300, "Height must be less than 300cm"),
  weight: z
    .number()
    .min(1, "Weight must be greater than 0")
    .max(500, "Weight must be less than 500kg"),
  image: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  onSubmit: (data: User, imageFile?: File) => Promise<void>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<User>({
    email: "",
    name: "",
    password: "",
    gender: "",
    fitLevel: "",
    height: 0,
    weight: 0,
    image: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [imgFile, setImgFile] = useState<File>();

  const validateForm = (): boolean => {
    try {
      registrationSchema.parse({
        ...formData,
        height: Number(formData.height),
        weight: Number(formData.weight),
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
    // Clear error when field is modified
    setErrors((prev) => ({ ...prev, [name as string]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData, imgFile);
    } catch (err) {
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newURL = URL.createObjectURL(e.target.files[0]);

      setFormData((prev) => ({
        ...prev,
        image: newURL,
      }));

      setImgFile(e.target.files[0]);
    }
  };

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

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant='h5' component='h1' gutterBottom align='center'>
          Register
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mr: 2 }}>
            <label htmlFor='photo-upload' style={{ cursor: "pointer" }}>
              <input
                id='photo-upload'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt={formData.image}
                src={formData.image}
              />
            </label>
          </Box>
          <TextField
            fullWidth
            margin='normal'
            label='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete='email'
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Name'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            error={!!errors.password}
            helperText={errors.password}
            slotProps={{ htmlInput: { minLength: 6 } }}
          />
          <RadioGroupButtons
            label='gender'
            name='gender'
            onChange={handleChange}
            options={genderOptions}
            value={formData.gender}
            required
            row={true}
            error={errors.gender}
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={6}>
              <TextField
                label='Height'
                name='height'
                value={formData.height}
                onChange={handleChange}
                required
                type='number'
                error={!!errors.height}
                helperText={errors.height}
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
                value={formData.weight}
                onChange={handleChange}
                required
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
          <ToggleButton
            label='fitLevel'
            onChange={(newValue) =>
              setFormData((prev) => ({ ...prev, fitLevel: newValue }))
            }
            value={formData.fitLevel}
            options={fitLevelOptions}
            error={errors.fitLevel}
          />
          {errors.submit && (
            <Alert severity='error' sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={loading}
            sx={{ mt: 3 }}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
