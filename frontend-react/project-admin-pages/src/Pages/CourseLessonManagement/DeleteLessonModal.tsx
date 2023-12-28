import React from 'react'
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import {
    Modal,
    Paper,
    Typography,
} from '@mui/material';
import { I_Course,I_Lesson } from "../../types/form.type";


interface LessonModalProps {
    open: boolean;
    onClose: () => void;
    deletedLesson: I_Lesson | null;
    courses: I_Course[] | null;
}

const DeletedLessonModal: React.FC<LessonModalProps> = ({  open, onClose, deletedLesson ,courses}) => {
    const courseOptions = courses?.map((course) => ({
        name: course.name,
        id: course.id,
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

                {deletedLesson && (     <Paper
          sx={{ p: 2, maxWidth: "800px", maxHeight: "600px", overflow: "auto" }}
        >
          <FormControl style={{ margin: "8px", minWidth: "120px", width: "95%" }}>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="name">Tên bài học</label>
              <TextField
              size="small"
                type="text"
                id="name"
                name="name"
                
                value={deletedLesson.name}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="courses_id">Danh mục</label>
              <Select
                size="small"
                id="courses_id"
                name="courses_id"
                value={deletedLesson.courses_id}
                style={{ width: "100%" }}
              >
                {courseOptions?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="video">Video</label>
              <TextField
              size="small"
                type="text"
                id="video"
                name="video"
                value={deletedLesson.video}
                
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="exercise">Bài tập</label>
              {deletedLesson.exercise && (
                <img
                src={typeof deletedLesson.exercise === 'string' ? deletedLesson.exercise : URL.createObjectURL(deletedLesson.exercise)}
                  alt="Course Image"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              )}
            </div>
            <div style={{ marginBottom: 5 }}>
            <label htmlFor="duration">Ảnh</label>
            {deletedLesson.lesson_img && (
                <img
                src={typeof deletedLesson.lesson_img === 'string' ? deletedLesson.lesson_img : URL.createObjectURL(deletedLesson.lesson_img)}
                  alt="Course Image"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              )}
            </div>
          </FormControl>
        </Paper> )}

                <Button variant="contained" color="primary" style={{ marginTop: 20, marginRight: 20 }} onClick={onClose}>
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
};

export default DeletedLessonModal