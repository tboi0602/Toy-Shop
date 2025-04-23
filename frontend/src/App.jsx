import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/SignupPage";
import DbCustomer from "./pages/DbCustomer";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dbcustomer" element={<DbCustomer />} />
      </Routes>
    </Router>
  );
}
export default App
