import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import RadioGroupButtons, {
  Option,
} from "../../components/RadioGroup/RadioGroup";
import ToggleButton from "../../components/ToggleButtons";

interface RegistrationData {
  email: string;
  name: string;
  password: string;
  gender: string;
  fitLevel: string;
}

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => Promise<void>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    email: "",
    name: "",
    password: "",
    gender: "",
    fitLevel: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
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
          />
          <RadioGroupButtons
            label='gender'
            name='gender'
            onChange={handleChange}
            options={genderOptions}
            value={formData.gender}
            required
          />
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
