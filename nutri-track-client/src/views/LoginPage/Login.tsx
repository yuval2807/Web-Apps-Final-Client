import { Button } from "@mui/material";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    // Add your authentication logic here
    // For demo, just navigate to home
    navigate("/home");
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
      <Button onClick={() => navigate("/register")} sx={{ mt: 2 }}>
        Need an account? Register
      </Button>
    </div>
  );
};
