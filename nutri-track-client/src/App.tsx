import { BrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Router, { router } from "./Router";
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { NavProvider } from "./context/NavContext";

function App() {
  return (
    <div className='App'>
      <GoogleOAuthProvider
        clientId={
          "663257001119-t30hvqookots5n6oji8eqkuvv4lkkc86.apps.googleusercontent.com"
        }>
        <UserProvider>
          <NavProvider>
          <RouterProvider router={router} />
            {/* <BrowserRouter >
              <Router /> */}
              <ToastContainer position='bottom-right' />
            {/* </BrowserRouter> */}
          </NavProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
