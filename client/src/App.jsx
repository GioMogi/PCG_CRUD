import { HashRouter as Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Owners from "./pages/Owners";
import LandHoldings from "./pages/LandHoldings";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <div className="p-4">
          <Routes>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
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
        </div>
      </main>
    </>
  );
}

export default App;
