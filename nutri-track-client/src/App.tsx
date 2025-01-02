import "./App.css";
import LoginForm from "./views/LoginForm";
import RegistrationForm from "./views/Registration";
const handleRegister = async (data: any) => {
  // Add registration logic here
  console.log(data);
};

function App() {
  return (
    <div className='App'>
      {" "}
      first page
      <LoginForm onSubmit={() => console.log("yy")}></LoginForm>
      <RegistrationForm onSubmit={handleRegister} />{" "}
    </div>
  );
}

export default App;
