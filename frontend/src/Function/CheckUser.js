import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../services/handleAPI";

export const CheckUser = (requiredRole = null) => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const data = await checkSession();
      if (!data.loggedIn) {
        navigate("/error", { replace: true });
        return;
      }

      // Kiểm tra quyền của người dùng nếu có yêu cầu
      if (requiredRole && data.user.position !== requiredRole) {
        navigate("/error", { replace: true });
      }
    };
    check();
  }, [navigate, requiredRole]);
};
