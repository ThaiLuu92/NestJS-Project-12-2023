import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Button,
  Input,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { I_User } from "../../Types/formData.type";
import "./UserProfile.scss";
import { updateData } from "../../Apis/API";
import { useSelector } from "react-redux";
import { AuthState } from "../../Redux/Slice/AuthSlice";
import { fetchData } from "../../hooks/fetchUser";

const customTheme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
    },
  },
});

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const userLogin = useSelector(
    (state: { auth: AuthState }) => state.auth.user
  );
  const [formData, setFormData] = useState<I_User>({
    id: "",
    user_name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    level: "",
  });
  async function updateFormData() {
    updateData("users", formData.id, formData).then(() => {
      fetchData()
      setIsEditing(false);
    });
  }

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userLogin) {
      setFormData(userLogin);
    } else {
      setFormData({
        id: "",
        user_name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        level: "",
      });
    }
  }, [userLogin]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <h2>Thông tin cá nhân</h2>
      <form id="form-infor">
        <Box
          component="table"
          style={{
            width: "100%",
            borderSpacing: "0",
            borderCollapse: "collapse",
            marginBottom: "20px",
            fontSize: "15px",
            marginTop: "50px",
          }}
        >
          <tbody>
            <tr>
              <td>Mã ID:</td>
              <td>
                <Input  style={{ width: "100%"}}id="id" name="id" disabled value={formData.id} />
              </td>
            </tr>
            <tr>
              <td>Tên Tài khoản</td>
              <td>
                <Input
                style={{ width: "100%"}}
                  id="user_name"
                  name="user_name"
                  placeholder="Nhập tên tài khoản"
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  value={formData?.user_name}
                />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <Input
                 style={{ width: "100%"}}
                  id="email"
                  name="email"
                  disabled
                  value={formData.email}
                />
              </td>
            </tr>
            <tr>
              <td>Ngày tháng năm sinh</td>
              <td>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  style={{ width: "100%"}}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                //   value={convertToVnTimezone(new Date (formData.dob))}
                  value={formData?.dob?.split("T")[0]}

                />
              </td>
            </tr>
            <tr>
              <td>Số điện thoại:</td>
              <td>
                <Input
                 style={{ width: "100%"}}
                  id="phone"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  value={formData?.phone}
                />
              </td>
            </tr>
            <tr>
              <td>Địa chỉ:</td>
              <td>
                <Input
                 style={{ width: "100%"}}
                  id="address"
                  name="address"
                  placeholder="Nhập địa chỉ"
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  value={formData?.address}
                />
              </td>
            </tr>
            <tr>
              <td>Level</td>
              <td>
                <Input
                 style={{ width: "100%"}}
                  id="level"
                  name="level"
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  value={formData.level}
                />
              </td>
            </tr>
          </tbody>
        </Box>
        {isEditing ? (
          <Button
            variant="outlined"
            id="save-button"
            style={{ display: "block", marginRight: "10px" }}
            onClick={updateFormData}
          >
            Lưu
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={toggleEdit}
            id="edit-button"
            style={{ display: "block", marginRight: "10px" }}
          >
            Chỉnh Sửa
          </Button>
        )}
      </form>
    </>
  );
}

export default UserProfile;
