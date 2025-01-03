import { Button } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import { useNavigate } from "react-router-dom";
import { RegistrationData } from "./types";

export const Registration: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (data: RegistrationData) => {
    // Add registration logic here
    console.log(data);
    navigate("/home");
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
