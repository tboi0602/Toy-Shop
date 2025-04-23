import React from "react";
const InputUser = ({ name, icon, placeholder,value,onChange,type}) => {
  return (
    <div className="flex flex-col gap-y-5">
      <label className="text-[20px]" htmlFor="username">
        {name}
      </label>
      <div className="flex hover:scale-105">
        <div className="absolute z-10 text-red-600">{icon}</div>
        <input
          className="relative w-full border-b-[5px] border-red-600 outline-none pl-8 pb-1 "
          type={type}
          name="username"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default InputUser;