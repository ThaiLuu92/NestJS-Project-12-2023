import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { FormDataChangePassword } from "../../Types/formData.type";
import { errorMessageChangePassword } from "../../Types/error.type";
import { changePassword } from "../../Service/ChangePassword.Service";
import { AuthState } from "../../Redux/Slice/AuthSlice";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const navigate = useNavigate();
  const loggedInUserId = useSelector(
    (state: { auth: AuthState }) => state.auth.user.id
  );
  const [formData, setFormData] = useState<FormDataChangePassword>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<errorMessageChangePassword>({
    msgOldPassword: "",
    msgNewPassword: "",
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
    const newErrors: errorMessageChangePassword = {};

    if (!formData.oldPassword.trim()) {
      newErrors.msgOldPassword = "Mật khẩu cũ không được để trống";
    }
    if (!formData.newPassword.trim()) {
      newErrors.msgNewPassword = "Mật khẩu mới không được để trống";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.msgConfirmPassword = "Nhập lại mật khẩu không được để trống";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.msgConfirmPassword = "Passwords must match";
    }

    if (Object.values(newErrors).some((error) => !!error)) {
      setErrors(newErrors);
      return;
    }

    try {
      await changePassword(loggedInUserId, formData);
      navigate("/")
    } catch (error) {
      if (error) {
        const errorMsg = error as {
          msgOldPassword?: string;
          msgNewPassword?: string;
          msgConfirmPassword?: string;
        };
        setErrors(errorMsg);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 5,
        padding: 2,
        marginBottom: 5,
        borderRadius: 2,
      }}
    >
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Đổi mật khẩu
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            id="oldPassword"
            label="Mật khẩu cũ"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            error={!!errors.msgOldPassword}
            helperText={errors.msgOldPassword}
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
            error={!!errors.msgNewPassword}
            helperText={errors.msgNewPassword}
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

export default ChangePassword;
