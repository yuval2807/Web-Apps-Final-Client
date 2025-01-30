import { Button } from "@mui/material";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { googleLogin, login } from "../../queries/auth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

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
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
      <div className='separator'>OR</div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.error("Google Login Failed")}
        useOneTap={false}
      />
      <Button onClick={() => navigate("/register")} sx={{ mt: 2 }}>
        Need an account? Register
      </Button>
    </div>
  );
};
