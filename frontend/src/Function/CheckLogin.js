import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../services/handleAPI";

export const CheckLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const data = await checkSession();
      if (!data.loggedIn) {
        navigate("/login");
      }
    };
    check();
  }, [navigate]);
};
