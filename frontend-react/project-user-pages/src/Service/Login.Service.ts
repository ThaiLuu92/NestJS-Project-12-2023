// LoginLogic.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import * as Yup from "yup";
import axios from "../Apis/configApi";
import { LOGIN } from "../Apis/common";
import { errorMessageLogin } from "../Types/error.type";
import { loginFailure, loginSuccess } from "../Redux/Slice/AuthSlice";
import { createData } from "../Apis/API";

export const LoginService = (
  navigate: ReturnType<typeof useNavigate>,
  setError: React.Dispatch<React.SetStateAction<errorMessageLogin>>
) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const newErrors: errorMessageLogin = {
      msgUserName: "",
      msgEmail: "",
      msgPassword: "",
      msgConfirmPassword: "",
    };
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!formData.email.trim()) {
      newErrors.msgEmail = "Email không được để trống";
    } else if (!isValidEmail(formData.email)) {
      newErrors.msgEmail = "Email không hợp lệ";
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.msgPassword = !formData.password.trim()
        ? "Mật khẩu không được để trống"
        : "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (Object.values(newErrors).some((error) => !!error)) {
      setError(newErrors);
      return;
    }
    try {
      const response = await createData(LOGIN, { email, password });
      window.localStorage.setItem("X-API-Key", response.assetToken);
      const user = response.user;
      if (user) {
        dispatch(loginSuccess(user));
        navigate("/");
      }
    } catch (error) {
      if (error) {
        const errorMsg = error as errorMessageLogin;
        setError(errorMsg);
        dispatch(loginFailure());
      }
    }
  };

  return {
    handleSubmit,
    handleChange,
    formData,
  };
};
