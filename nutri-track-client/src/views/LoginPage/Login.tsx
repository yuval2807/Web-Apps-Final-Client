import { Button, Card, CardContent } from "@mui/material";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { googleLogin, login } from "../../queries/auth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

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
      toast.error(" משהו השתבש!");
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      if (credentialResponse.credential) {
        const connectedUser = await googleLogin(credentialResponse.credential);
        if (connectedUser) {
          updateConnectedUser(connectedUser);
          navigate("/home");
        }
      }
    } catch (err: any) {
      console.error("Google login failed:", err.message);
      toast.error(" משהו השתבש!");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        display: "flex",
        justifyContent: "center",
        mx: "auto",
        mt: 4,
      }}>
      <CardContent>
        <LoginForm onSubmit={handleLogin} />
        <GoogleLogin
          size='medium'
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google Login Failed")}
          useOneTap={false}
        />

        <Button onClick={() => navigate("/register")} sx={{ mt: 2 }}>
          Need an account? Register
        </Button>
      </CardContent>
    </Card>
  );
};
