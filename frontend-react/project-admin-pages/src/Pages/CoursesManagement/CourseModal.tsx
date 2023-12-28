import React, { useState, useEffect, ChangeEvent } from "react";
import { Autocomplete, Box, FormControl, TextField } from "@mui/material";
import { I_Course, I_Category } from "../../types/form.type";
import Button from "@mui/material/Button";
import { Modal, Paper, Typography } from "@mui/material";
import {
  createDataWithImage,
  updateDataWithImage,
} from "../../apis/API";
import { CREATE_COURSE, UPDATE_COURSE } from "../../apis/common";

interface CoursesModalProps {
  course: I_Course | null;
  open: boolean;
  onClose: () => void;
  categorys: I_Category[] | null;
  action: string;
  fetchCourses: Function;
}

const CoursesModal: React.FC<CoursesModalProps> = ({
  course,
  open,
  onClose,
  categorys,
  action,
  fetchCourses,
}) => {
  const [formData, setFormData] = useState<I_Course>({
    id: "",
    name: "",
    description: "",
    level: "",
    price: 0,
    duration: 0,
    course_img: "",
    status: true,
    category_id: "",
  });
  const [valueOption, setValueOption] = useState<{
    name: string;
    id: string;
  }>();
  
  useEffect(() => {
    setValueOption(
      categoryOptions?.find((category) => formData.category_id == category.id) || { name: "", id: "" }
    );
  }, [formData.id]);

  const categoryOptions =
  categorys?.map((category) => ({
    name: category.name,
    id: category.id,
  })) || [];
  
  const handleAddCourse = async () => {
    const { id, ...oder } = formData;
    await createDataWithImage(CREATE_COURSE, oder);
    fetchCourses();
    onClose();
  };



  const handleUpdateCourse = async () => {
    if (formData.name === course?.name) {
      const { name, status, ...oder } = formData;
      await updateDataWithImage(UPDATE_COURSE, formData.id, oder);
    } else {
      await updateDataWithImage(UPDATE_COURSE, formData.id, formData);
    }

    fetchCourses();
    onClose();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChangeCategory = (nameCategory: string) => {
    const categoryOption = categoryOptions?.find(
      (item) => item.name === nameCategory
    );
    if (categoryOption) {
      setValueOption(categoryOption);
      setFormData((pre)=>({ ...pre, category_id: categoryOption.id }));
    }
  };

  useEffect(() => {
    if (course) {
      setFormData({...course});
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        level: "",
        price: 0,
        duration: 0,
        course_img: "",
        status: true,
        category_id: "",
      });
    }
  }, [course]);

  


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
          <FormControl
            style={{ margin: "8px", minWidth: "120px", width: "95%" }}
          >
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="name">Tên khóa học</label>
              <TextField
                size="small"
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="category_id">Danh mục</label>
              <Autocomplete
                size="small"
                disablePortal
                id="category_id"
                options={categoryOptions}
                value={valueOption}
                onInputChange={(event, newValue) => {
                  handleChangeCategory(newValue);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* <Select
                size="small"
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={(event: SelectChangeEvent<string>) =>
                  handleSelectChange(event, "category_id")
                }
                style={{ width: "100%" }}
              >
                {categoryOptions?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select> */}
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="description">Mô tả</label>
              <TextField
                size="small"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="level">Cấp độ</label>
              <TextField
                size="small"
                type="text"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="price">Giá</label>
              <TextField
                size="small"
                type="text"
                id="price"
                name="price"
                value={formData.price.toLocaleString()}
                onChange={handleInputChange}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="duration">Thời gian học (tháng)</label>
              <TextField
                size="small"
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="course_img">Ảnh</label>
              <input
                type="file"
                id="course_img"
                name="course_img"
                onChange={handleInputChange}
                style={{ width: "100%", fontSize: 16, marginBottom: 5 }}
              />
              {formData.course_img && (
                <img
                  src={
                    typeof formData.course_img === "string"
                      ? formData.course_img
                      : URL.createObjectURL(formData.course_img)
                  }
                  alt="Course Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginTop: "5px",
                  }}
                />
              )}
            </div>
          </FormControl>
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

export default CoursesModal;
