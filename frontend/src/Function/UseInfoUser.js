import { useState, useEffect } from "react";
import { loadInfo, updateInfo } from "../services/handleAPI.js";
import Swal from "sweetalert2";

const useInfo = () => {
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

  const [initialInfo, setInitialInfo] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await loadInfo();
      if (data.success) {
        const userInfo = {
          yourname: data.user.yourname,
          username: data.user.username,
          gender: data.user.gender,
          birthDay: data.user.birthDay?.split("T")[0] || "",
          country: data.user.country,
          address: data.user.address,
          email: data.user.email,
          position: data.user.position,
        };
        setInfo(userInfo);
        setInitialInfo(userInfo); // Lưu thông tin ban đầu
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const data = await updateInfo(info);
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You have updated successfully',
          confirmButtonColor: '#d33'
        });
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setInfo(initialInfo); // Khi Cancel, khôi phục lại thông tin ban đầu
  };

  return {
    info,
    setInfo,
    initialInfo,
    handleChange,
    handleSave,
    handleCancel
  };
};

export default useInfo;
