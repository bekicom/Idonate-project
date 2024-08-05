import { Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Layout from "./layout";
import Register from "./pages/auth/Register";

function App() {
  const auth = localStorage.getItem("token");
  if (auth) {
    return <Layout />;
  } else {
    return (
      <>
        {/* <Auth /> */}
        <Register />
        {/* <Navigate to={"/login"} /> */}
      </>
    );
  }
}

export default App;
