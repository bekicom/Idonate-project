import { Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Layout from "./layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import RootRoutes from "./routes";

function App() {
  const auth = localStorage.getItem("token");

  console.log(auth);
  if (auth) {
    return  <RootRoutes/>;
  } else {
    return (
      <>
    <Register/>
      </>
    );
  }
}

export default App;
