import React, { useEffect, useState } from "react";
import avt from "../assets/avt.jpg";
import { countries } from "../Data/Countries.js";
import { loadinfo, updateinfo } from "../services/handleAPI.js";
import Swal from "sweetalert2";
const Infomation = () => {
  const [isEditting, setIsEditting] = useState(false);
  const [info, setInfo] = useState({
    username: "",
    email: "",
    yourname: "",
    gender: "",
    birthDay: "",
    country: "",
    address: "",
    avatar: "",
    position: "",
  });

  useEffect(() => {
    const getData = async () => {
      const data = await loadinfo();
      if (data.success) {
        setInfo({
          yourname: data.user.yourname,
          username: data.user.username,
          gender: data.user.gender,
          birthDay: data.user.birthDay?.split("T")[0] || "",
          country: data.user.country,
          address: data.user.address,
          email: data.user.email,
          position: data.user.position,
        });
      }
    };
    getData();
  }, []);

  const handleEdit = () => {
    setIsEditting(true);
  };

  const handleSave = () => {
    setIsEditting(false);
    try{
      const data = updateinfo(info);
      if(data.success){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You are Sign up Success',
          confirmButtonColor: '#d33'
        })
      }else{
        console.log(data.message)
      }
    }catch(err){console.log(err)}
    
  };

  const handleCancel = () => {
    setIsEditting(false);
    
  };

  return (
    <div className="w-11/12 bg-white flex-col justify-center m-auto my-8 rounded-2xl">
      <div className="font-bold text-[20px] text-white w-full rounded-t-2xl py-3 text-center bg-gradient-to-r from-red-600 to-red-400">
        Welcome, {info.username}
      </div>
      <div className="avt flex ">
        <div className="flex-none avt w-[100px] h-[100px] mx-8 my-4">
          <img className="fix-img rounded-full" src={avt} alt="" />
        </div>
        <div className="grow flex flex-col justify-center">
          <p className="text-[20px] font-bold">{info.username}</p>
          <p className="text-gray-500 text-[13px]">{info.email}</p>
          <p className="text-white bg-red-600 px-2 py-0.5 rounded-lg max-w-fit text-[12px] ">
            {info.position}
          </p>
        </div>
        <div className="px-8 py-12">
          {!isEditting ? (
            <button
              className="flex-none btn-error px-5 py-1 rounded-md"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                className="btn-error px-5 py-1 rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="btn-error-outline px-5 py-1 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-8">
        {[
          {
            label: "Full Name",
            type: "text",
            placeholder: info.yourname ? info.yourname : "Your full name",
          },
          { label: "User Name", type: "text", placeholder: info.username },
          {
            label: "Gender",
            type: "select",
            options: ["Select", "Male", "Female"],
            value: "info.gender",
          },
          { label: "Birth of day", type: "date" },
          { label: "Country", type: "select", options: countries },
          {
            label: "Address",
            type: "text",
            placeholder: "Your address",
            value: info.address,
          },
        ].map((field, index) => (
          <div key={index} className="flex flex-col gap-3">
            <label>{field.label}</label>
            {field.type === "select" ? (
              <select
                disabled={!isEditting}
                value={field.label === "Gender" ? info.gender : info.country}
                className={`h-[50px] rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 ${
                  isEditting
                    ? "bg-white border border-red-400"
                    : "bg-[#F9F9F9] cursor-not-allowed text-gray-600"
                }`}
                onChange={(e)=>(setInfo(e))} //!Suwax laij
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                disabled={!isEditting}
                type={field.type}
                placeholder={field.placeholder || ""}
                className={`h-[50px] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 ${
                  isEditting
                    ? "bg-white border border-red-400"
                    : "bg-[#F9F9F9] cursor-not-allowed text-gray-600 placeholder:text-gray-600"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col px-8 gap-2">
        <p className="font-bold flex-none">My email Address</p>
        <div className="flex gap-x-3 items-center pb-5">
          <div className="text-red-600 bg-red-100 w-9 h-9 rounded-full center hover:bg-red-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </div>
          <div className="grow">
            <input
              disabled={!isEditting}
              type="text"
              placeholder={info.email}
              className={`${
                !isEditting && !info.email
                  ? "bg-transparent outline-none w-3/12 border-b-2 px-2 h-[50px] cursor-not-allowed "
                  : "outline-none w-3/12 border-b-2 px-2 h-[50px] rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-[#F9F9F9] text-gray-500"
              } ${isEditting ? "bg-white border border-red-400" : ""}`}
            />
          </div>
          <button
            className="btn-error-outline p-2 rounded-lg text-[12px] cursor-pointer"
            disabled={!isEditting}
          >
            Change password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Infomation;
