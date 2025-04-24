import React from 'react';
import HdCustomer from "../layouts/HdCustomer";
import Infomation from '../layouts/Infomation';
import Footer from '../layouts/Footer';
import Product from "../components/Product";

const Profile = () => {
  const produc = Array.from({ length: 100 }, (_, i) => i + 1);
  return (
    <div>
      <HdCustomer styleOrder="btn-line" styleCart="btn-line" stylePro="line"></HdCustomer>
      <Infomation></Infomation>
      <div className='formatProducts gap-5 pb-8'>
        {produc.map(()=>(
          <Product></Product>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profile;