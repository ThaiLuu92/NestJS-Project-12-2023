import React from 'react'
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import {
    Modal,
    Paper,
    Typography,
} from '@mui/material';
import { I_Course,I_Category } from "../../types/form.type";

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    deletedCourses: I_Course | null;
    categorys: I_Category[] | null;
}

const DeletedCourseModal: React.FC<CategoryModalProps> = ({  open, onClose, deletedCourses ,categorys}) => {
    const categoryOptions = categorys?.map((category) => ({
        name: category.name,
        id: category.id,
      }));
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Thông tin khóa học
                </Typography>

                {deletedCourses && (   <Paper
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
                value={deletedCourses.name}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="category_id">Danh mục</label>
              <Select
                size="small"
                id="category_id"
                name="category_id"
                value={deletedCourses.category_id}
                style={{ width: "100%" }}
              >
                {categoryOptions?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="description">Mô tả</label>
              <TextField
                size="small"
                id="description"
                name="description"
                value={deletedCourses.description}
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
                value={deletedCourses.level}
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
                value={deletedCourses.price.toLocaleString()}
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
                value={deletedCourses.duration}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
            <label htmlFor="duration">Ảnh</label>
            {deletedCourses.course_img && (
                <img
                src={typeof deletedCourses.course_img === 'string' ? deletedCourses.course_img : URL.createObjectURL(deletedCourses.course_img)}
                  alt="Course Image"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              )}
            </div>
          </FormControl>
        </Paper>)}

                <Button variant="contained" color="primary" style={{ marginTop: 20, marginRight: 20 }} onClick={onClose}>
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
};

export default DeletedCourseModal