import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupButton = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/signup"); // chuyển đến trang Login
  };
  return (
    <div>
      <button  onClick={handleLoginClick}>Sign up</button>
    </div>
  );
};

export default SignupButton;