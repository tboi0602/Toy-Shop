import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login"); // chuyển đến trang Login
  };
  return (
      <button  onClick={handleLoginClick}>Log in</button>
  );
};

export default LoginButton;