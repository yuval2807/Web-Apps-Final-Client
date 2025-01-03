import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginForm from "./views/LoginPage";
import Registration from "./views/Registration";
import Router from "./Router";
const handleRegister = async (data: any) => {
  // Add registration logic here
  console.log(data);
};

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
