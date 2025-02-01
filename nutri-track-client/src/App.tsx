import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <div className='App'>
      <GoogleOAuthProvider
        clientId={
          "663257001119-t30hvqookots5n6oji8eqkuvv4lkkc86.apps.googleusercontent.com"
        }>
        <UserProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
