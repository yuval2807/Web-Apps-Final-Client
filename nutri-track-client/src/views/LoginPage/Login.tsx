import { Button } from "@mui/material";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { login } from "../../queries/auth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { updateConnectedUser } = useContext(UserContext);

  const handleLogin = async (email: string, password: string) => {
    try {
      const connectedUser = await login({ email, password });
      if (!!connectedUser) {
        updateConnectedUser(connectedUser);
        navigate("/home");
      }
    } catch (err: any) {
      console.error(err.message);
    }
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
