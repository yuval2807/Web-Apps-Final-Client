import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className='App'>
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
