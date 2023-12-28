import React, { useState, useEffect, ChangeEvent } from "react";
import { Autocomplete, Box, FormControl, TextField } from "@mui/material";
import { I_Course, I_Lesson, I_Question } from "../../types/form.type";
import Button from "@mui/material/Button";
import { Modal, Paper, Typography } from "@mui/material";
import {
  createData,
  updateData,
} from "../../apis/API";
import {
  CREATE_QUESTION,
  UPDATE_QUESTION,
} from "../../apis/common";

interface QuestionModalProps {
  quesion: I_Question | null;
  lessons: I_Lesson[] | null;
  courses: I_Course[] | null;
  open: boolean;
  onClose: () => void;
  action: string;
  fetchQuestions: Function;

}

const QuestionModal: React.FC<QuestionModalProps> = ({
  quesion,
  lessons,
  courses,
  open,
  onClose,
  action,
  fetchQuestions,
}) => {
  const [formData, setFormData] = useState<I_Question>({
    id: "",
    question_text: "",
    lesson_id: "",
    courses_id: "",
  });

  const [valueOptionCourse, setValueOptionCourse] = useState<{
    name: string;
    id: string;
  }>();
  const [valueOptionLesson, setValueOptionLesson] = useState<{
    name: string;
    id: string;
  }>();

  const [courseOptions, setCourseOptions] = useState<
    Array<{ name: string; id: string }>
  >([]);

  const [lessonOptions, setLessonOptions] = useState<
    Array<{ name: string; id: string }>
  >([]);

  useEffect(() => {
    const updatedCourseOptions =
      courses?.map((course) => ({
        name: course.name,
        id: course.id,
      })) || [];
    setCourseOptions(updatedCourseOptions);
  }, [courses]);

  useEffect(() => {
    const updatedLessonOptions =
      lessons
        ?.filter((lesson) => lesson.courses_id == valueOptionCourse?.id)
        .map((lesson) => ({
          name: lesson.name,
          id: lesson.id,
          courses_id: lesson.courses_id,
        })) || [];
    setLessonOptions(updatedLessonOptions);
  }, [valueOptionCourse]);

  useEffect(() => {
    setValueOptionCourse(
      courseOptions?.find((courses) => formData.courses_id == courses.id) || {
        name: "",
        id: "",
      }
    );
    setValueOptionLesson(
      lessons?.find((lesson) => formData.lesson_id == lesson.id) || {
        name: "",
        id: "",
      }
    );
  }, [formData.id]);

  const handleAddCourse = async () => {
    const { id, ...oder } = formData;
    await createData(CREATE_QUESTION, oder);
    fetchQuestions();
    onClose();
  };

  const handleUpdateCourse = async () => {
    if (formData.question_text === quesion?.question_text) {
      const { question_text, ...oder } = formData;
      await updateData(UPDATE_QUESTION, formData.id, oder);
    } else {
      await updateData(UPDATE_QUESTION, formData.id, formData);
    }
    fetchQuestions();
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
  

  const handleSelectChangeCourse = (nameCourse: string) => {
    const courseOption = courseOptions?.find(
      (item) => item.name === nameCourse
    );

    if (courseOption) {
      setValueOptionCourse(courseOption);
      setFormData((pre) => ({ ...pre, courses_id: courseOption.id }));
    }
  };

  const handleSelectChangeLesson = (nameLesson: string) => {
  
    
    const lessonOption = lessonOptions?.find(
      (item) => item.name === nameLesson
    );

    if (lessonOption) {
      setValueOptionLesson(lessonOption);
      setFormData((pre) => ({ ...pre, lesson_id: lessonOption.id }));
    }
  };

  useEffect(() => {
    if (quesion) {
      setFormData(quesion);
    } else {
      setFormData({
        id: "",
        question_text: "",
        lesson_id: "",
        courses_id: "",
      });
    }
  }, [quesion]);

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
          Thông tin bài học
        </Typography>

        <Paper
          sx={{ p: 2, maxWidth: "800px",height:"500px", overflow: "auto" }}
        >
          <FormControl
            style={{ margin: "8px", minWidth: "120px", width: "95%" }}
          >
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="question_text">Nội dung câu hỏi</label>
              <TextField
                size="small"
                type="text"
                id="question_text"
                name="question_text"
                onChange={handleInputChange}
                value={formData.question_text}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="courses_id">Khóa học</label>
              <Autocomplete
                size="small"
                disablePortal
                id="courses_id"
                options={courseOptions}
                value={valueOptionCourse}
                onInputChange={(event, newValue) => {
                  handleSelectChangeCourse(newValue);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="lesson_id">Bài học</label>
              <Autocomplete
                size="small"
                disablePortal
                id="lesson_id"
                options={lessonOptions}
                value={valueOptionLesson}
                onInputChange={(event, newValue) => {
                  handleSelectChangeLesson(newValue);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
              />
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

export default QuestionModal;
