import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { useAuth } from "./context/AuthContext";
import Checkout from "./components/Checkout";

function App() {
  const { authenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/register"
          element={
            authenticated ? <Navigate replace to="/plans" /> : <Register />
          }
        />
        <Route
          path="/login"
          element={authenticated ? <Navigate replace to="/plans" /> : <Login />}
        />
        {authenticated ? (
          <Route path="/plans" element={<Checkout />} />
        ) : (
          <Route path="/plans" element={<Navigate replace to="/login" />} />
        )}
         <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}
export default App;
