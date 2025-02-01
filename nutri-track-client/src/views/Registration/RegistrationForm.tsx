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
} from "@mui/material";
import RadioGroupButtons, {
  Option,
} from "../../components/RadioGroup/RadioGroup";
import ToggleButton from "../../components/ToggleButtons";
import { User } from "../../queries/user";

interface RegistrationFormProps {
  onSubmit: (data: User) => Promise<void>;
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
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
          <TextField
            fullWidth
            margin='normal'
            label='Email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete='email'
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
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={6}>
              <TextField
                label='Height'
                name='height'
                value={formData.height}
                onChange={handleChange}
                required
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
          />
          {error && (
            <Alert severity='error' sx={{ mt: 2 }}>
              {error}
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
