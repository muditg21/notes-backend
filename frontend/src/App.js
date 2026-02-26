import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<h1>Register</h1>} /> */}
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;