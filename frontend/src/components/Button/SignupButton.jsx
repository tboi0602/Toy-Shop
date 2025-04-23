import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupButton = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/signup"); // chuyển đến trang Login
  };
  return (
    <div>
      <button className='btn-error-outline px-6 py-4 rounded-full whitespace-nowrap' onClick={handleLoginClick}>Sign up</button>
    </div>
  );
};

export default SignupButton;