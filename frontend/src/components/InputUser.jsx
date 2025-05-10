const InputUser = ({ name, icon, placeholder, value, onChange, type }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <label className="text-[20px]" htmlFor={name}>
        {name}
      </label>
      <div className="relative flex items-center  ">
        <div className="absolute z-10 text-red-600 ml-2 pb-2">{icon}</div>
        <input
          id={name}
          className="relative bg-transparent w-full border-b-[5px] border-red-600 outline-none pl-10 pb-1 rounded-t-lg py-2"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputUser;
