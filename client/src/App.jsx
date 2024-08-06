import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Owners from "./pages/Owners";
import LandHoldings from "./pages/LandHoldings";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/owners"
          element={
            <PrivateRoute>
              <Owners />
            </PrivateRoute>
          }
        />
        <Route
          path="/landholdings"
          element={
            <PrivateRoute>
              <LandHoldings />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
