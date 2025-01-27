import { Button } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import { useNavigate } from "react-router-dom";
import { RegistrationData } from "./types";
import { register } from "../../queries/auth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { updateConnectedUser } = useContext(UserContext);

  const handleRegister = async (data: RegistrationData) => {
    // Add registration logic here
    try {
      const connectedUser = await register(data);
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
      <RegistrationForm onSubmit={handleRegister} />
      <Button onClick={() => navigate("/login")} sx={{ mt: 2 }}>
        already have an account? Login
      </Button>
    </div>
  );
};
