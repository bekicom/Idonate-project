import { Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Layout from "./layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

function App() {
  const auth = localStorage.getItem("token");
  if (auth) {
    return <Layout />;
  } else {
    return (
      <>
        {/* <Auth /> */}
    <Login/>
        {/* <Navigate to={"/login"} /> */}
      </>
    );
  }
}

export default App;
