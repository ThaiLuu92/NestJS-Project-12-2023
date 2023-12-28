import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { errorMessageResetPassword } from "../../../Types/error.type";
import { AxiosError } from "axios";
import { FormDataResetPassword } from "../../../Types/formData.type";
import { resetPassword } from "../../../Service/ResetPassword.Service";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataResetPassword>({
    email: "",
    codeResetPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<errorMessageResetPassword>({
    msgCode: "",
    msgEmail: "",
    msgPassword: "",
    msgConfirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Basic form validation
    const newErrors: errorMessageResetPassword = {};
    if (!formData.email.trim()) {
      newErrors.msgEmail = "Email không được để trống";
    }
    if (!formData.codeResetPassword.trim()) {
      newErrors.msgCode = "Mã xác nhận không được để trống";
    }
    if (!formData.newPassword.trim()) {
      newErrors.msgPassword = "Mật khẩu mới không được để trống";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.msgConfirmPassword = "Nhập lại mật khẩu không được để trống";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.msgConfirmPassword = "Nhập lại mật khẩu không khớp";
    }

    if (Object.values(newErrors).some((error) => !!error)) {
      setErrors(newErrors);
      return;
    }

    try {
      await resetPassword(formData);
      alert("Đổi mật khẩu thành công");
      navigate("/Login");
    } catch (error) {
      if (error ) {
        const errorMsg = error as errorMessageResetPassword
        setErrors(errorMsg);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 20,
        boxShadow: "3px 3px 3px 4px rgba(0, 0, 0, 0.1)",
        padding: 2,
        marginBottom: 30,
        borderRadius: 5,
      }}
    >
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Lấy lại mật khẩu
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.msgEmail}
            helperText={errors.msgEmail}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="codeResetPassword"
            label="Mã xác nhận"
            name="codeResetPassword"
            value={formData.codeResetPassword}
            onChange={handleChange}
            error={!!errors.msgCode}
            helperText={errors.msgCode}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.msgPassword}
            helperText={errors.msgPassword}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.msgConfirmPassword}
            helperText={errors.msgConfirmPassword}
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Xác nhận
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
