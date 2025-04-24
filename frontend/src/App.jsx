import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/SignupPage";
import DbCustomer from "./pages/DbCustomer";
import ProfileC from "./pages/ProfileC";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dbcustomer" element={<DbCustomer />} /> // Dashboard of customer
        <Route path="/profile" element={<ProfileC />} /> // profile of customer
      </Routes>
    </Router>
  );
}
export default App
