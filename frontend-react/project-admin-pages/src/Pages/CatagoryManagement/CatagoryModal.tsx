import React, { useState, useEffect, ChangeEvent } from "react";
import { Box, TextField, TextareaAutosize } from "@mui/material";
import { I_Category } from "../../types/form.type";
import { errorMessageCategory } from "../../types/error.type";
import Button from "@mui/material/Button";
import { Modal, Paper, Typography } from "@mui/material";
import { createData, getDataById, updateData } from "../../apis/API";
import { AxiosError } from "axios";
import {
  CREATE_CATEGORY,
  GET_CATEGORY,
  UPDATE_CATEGORY,
} from "../../apis/common";

interface CoursesModalProps {
  open: boolean;
  onClose: () => void;
  catagory: I_Category | null;
  action: string;
  fetchCatagorys: Function;
}

const CatagoryModal: React.FC<CoursesModalProps> = ({
  open,
  onClose,
  catagory,
  action,
  fetchCatagorys,
}) => {
  const [errorCategory, setErrorCategory] =
    React.useState<errorMessageCategory>({
      msgName: "",
      msgDes: "",
    });
  const [formData, setFormData] = useState<I_Category>({
    id: "",
    name: "",
    description: "",
    status: true,
  });
  const [currentData, setCurrentData] = useState(formData);
  useEffect(() => {
    fetchCatagoryId();
  }, [formData.id]);

  async function fetchCatagoryId() {
    if (formData.id) {
      const getCatagory = await getDataById(GET_CATEGORY, formData.id);
      setCurrentData(getCatagory);
    }
  }

  const handleAddCourse = async () => {
    try {
      const newCourse = {
        name: formData.name,
        description: formData.description,
        status: true,
      };
      await createData(CREATE_CATEGORY, newCourse);
      fetchCatagorys();
      onClose();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMsg = error.response.data.errors as errorMessageCategory;
        setErrorCategory(errorMsg as errorMessageCategory);
      }
    }
  };

  const handleUpdateCourse = async () => {
    const updatedCourse = {
      name: formData.name,
      description: formData.description,
    };
    if (formData.name === currentData.name) {      
      await updateData(UPDATE_CATEGORY, formData.id, {
        description: formData.description,
      });
    } else {
      await updateData(UPDATE_CATEGORY, formData.id, updatedCourse);
    }
    fetchCatagorys();
    onClose();
  };

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
    if (catagory) {
      setFormData(catagory);
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        status: true,
      });
    }
  }, [catagory]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Thông tin khóa học
        </Typography>

        <Paper
          sx={{ p: 2, maxWidth: "800px", maxHeight: "600px", overflow: "auto" }}
        >
          <form>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="name">Tên danh mục</label>
              <TextField
                error={errorCategory?.msgName ? true : false}
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                style={{ width: "100%", fontSize: 16, padding: 9 }}
                helperText={errorCategory?.msgName}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="description">Mô tả</label>
              <TextField
                error={errorCategory?.msgDes ? true : false}
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  fontSize: 16,
                  padding: 9,
                  minHeight: "100px",
                }}
                helperText={errorCategory?.msgDes}
              />
            </div>
          </form>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20 }}
          onClick={onClose}
        >
          Đóng
        </Button>
        {action !== "view" ? (
          action === "add" ? (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleAddCourse}
            >
              Thêm
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleUpdateCourse}
            >
              Sửa
            </Button>
          )
        ) : null}
      </Box>
    </Modal>
  );
};

export default CatagoryModal;
