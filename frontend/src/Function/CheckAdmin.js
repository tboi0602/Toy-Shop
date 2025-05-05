import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../services/handleAPI";

export const CheckAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const data = await checkSession();
      if (data.user.position!=="Admin") {
        navigate("/error");
      }
    };
    check();
  }, [navigate]);
};
