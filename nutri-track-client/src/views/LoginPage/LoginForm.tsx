import React, { useState } from "react";
import { Typography, TextField, Button, Alert, Box } from "@mui/material";
import { z } from "zod";

// Define the Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Create a type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    try {
      loginSchema.parse({ email, password });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit(email, password);
    } catch (err) {
      setErrors({ submit: "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant='h5' component='h1' gutterBottom align='center'>
        Login
      </Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          margin='normal'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete='email'
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete='current-password'
          error={!!errors.password}
          helperText={errors.password}
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
          sx={{ my: 3 }}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
