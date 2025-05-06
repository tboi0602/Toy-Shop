import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfileCustomer from "./pages/ProfileCustomer";
import ChangePass from "./pages/ChangePass";
import LoadingPage from "./pages/LoadingPage";
import DashBoardCustomer from "./pages/DashBoardCustomer";
import DashboardAdmin from "./pages/DashboardAdmin";
import ErrorPage from "./pages/ErrorPage";
import HeaderAdmin from "./layouts/HeaderAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoadingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard-customer" element={<DashBoardCustomer />} /> // Dashboard of customer
        <Route path="/profile-customer" element={<ProfileCustomer />} /> // profile of customer
        <Route path="/change-password" element={<ChangePass />} /> 
        <Route path="/dashboard-admin" element={<DashboardAdmin />} /> 
        <Route path="/error" element={<ErrorPage />} /> 
        <Route path="/headeradmin" element={<HeaderAdmin />} /> 
      </Routes>
    </Router>
  );
}
export default App
