import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfileCustomer from "./pages/ProfileCustomer";
import ChangePass from "./pages/ChangePass";
import LoadingPage from "./pages/LoadingPage";
import DashBoardCustomer from "./pages/DashBoardCustomer";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoadingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard-customer" element={<DashBoardCustomer />} /> // Dashboard of customer
        <Route path="/profile-customer" element={<ProfileCustomer />} /> // profile of customer
        <Route path="/change-pasword" element={<ChangePass />} /> 
        
      </Routes>
    </Router>
  );
}
export default App
