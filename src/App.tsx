import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./Components/RegistrationForm";
import LoginForm from "./Components/LoginForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
