import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import LoginForm from "./pages/demo";
import { Navigate } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/demo" element={<LoginForm />} />
        <Route path="/*" element={<Navigate to="/demo" />} />


      </Routes>
    </Router>
  );
}

export default App;
