import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Avatar, Box, Button, Container, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { I_User_Avatar } from "../../Types/formData.type";
import {
  fetchUserData,
  getDataById,
  updateDataByPatchUserAvatar,
} from "../../Apis/API";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, loginSuccess } from "../../Redux/Slice/AuthSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchData, useFetchData } from "../../hooks/fetchUser";
import { USERS } from "../../Apis/common";

const customTheme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
    },
  },
});

export default function User() {
  const userLogin = useSelector(
    (state: { auth: AuthState }) => state.auth.user
  );
  const { fetchUserData } = useFetchData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<I_User_Avatar>({
    avatar: "",
  });

  const [selectedMenuItem, setSelectedMenuItem] =
    useState<string>("Thông tin cá nhân");

  useEffect(() => {
    if (userLogin) {
      setFormData(userLogin);
    } else {
      setFormData({
        avatar: "",
      });
    }
  }, [userLogin]);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      updateFormData(files[0]);
      navigate("/User", { replace: true });
    }
  };

  const updateFormData = async (file: File) => {
    try {
      const avatar = await updateDataByPatchUserAvatar(
        USERS,
        userLogin.id,
        file
      );
      fetchUserData();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const menuItems = [
    { label: "Thông tin cá nhân", route: "/User" },
    { label: "Khóa học đã mua", route: "/User/MyCourse" },
    { label: "Lịch sử thanh toán", route: "/User/MyPayment" },
    { label: "Đổi mật khẩu", route: "/User/ChangePassword" },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <Container
        maxWidth="lg"
        sx={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <Box display="flex" sx={{ padding: "20px" }}>
          <Paper
            elevation={3}
            style={{
              width: "250",
              padding: "30px",
              marginRight: "20px",
              height: "600px",
            }}
          >
            <Avatar
              variant="rounded"
              sx={{ width: 200, height: 200, border: "0.5px solid #eee" }}
            >
              <img
                src={
                  typeof formData.avatar === "string"
                    ? formData.avatar
                    : URL.createObjectURL(formData.avatar)
                }
                alt="Avatar"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Avatar>
            <input
              type="file"
              id="avatar-input"
              accept="image/*"
              name="avatar"
              onChange={handleInputChange}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              style={{ width: "100%", marginTop: "10px" }}
              onClick={() => document.getElementById("avatar-input")?.click()}
            >
              <i className="fa-solid fa-camera"></i> Thay đổi ảnh đại diện
            </Button>
            <div
              className="account-menu-left"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {menuItems.map((item) => (
                <p
                  key={item.label}
                  onClick={() => {
                    navigate(item.route);
                    setSelectedMenuItem(item.label);
                  }}
                  style={{
                    color: selectedMenuItem === item.label ? "blue" : "black",
                    fontWeight:
                      selectedMenuItem === item.label ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </p>
              ))}
            </div>
          </Paper>
          <Paper elevation={3} style={{ flex: 1, padding: "20px" }}>
            <Outlet />
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
