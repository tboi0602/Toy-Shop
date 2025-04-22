import React from "react";
import Header from "../layouts/Header";
import Product from "../components/Product";
import BackgroundContent from "../assets/onepiec1.jpg";

const Dashboard = () => {
  return (
    <div>
      <Header></Header>
      <div className="w-full" style={{ height: "calc(100vh - 100px)" }}>
        <img
          className="w-full fix-img"
          style={{ height: "calc(100vh - 100px)" }}
          src={BackgroundContent}
          alt=""
        />
      </div>
      <Product></Product>
    </div>
  );
};

export default Dashboard;
