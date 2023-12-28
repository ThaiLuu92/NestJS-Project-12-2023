import React, { useEffect, useState } from "react";
import "./Lessons-User.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDataById, updateData } from "../../Apis/API";
import { COURSE_USER, LESSON_USER } from "../../Apis/common";
import { AuthState } from "../../Redux/Slice/AuthSlice";
import { useSelector } from "react-redux";
import { I_CourseView } from "../../Types/formData.type";
import Lesson from "../../Components/Lesson/Lesson";
import { Stack } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { errorMessageCheckOut } from "../../Types/error.type";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LessonsUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userLogin = useSelector(
    (state: { auth: AuthState }) => state.auth.user
  );
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = useState<I_CourseView[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [error, setError] = useState<errorMessageCheckOut>({ msgCheck: "" });
  const indexToSelect = 0; // Đặt index bạn muốn lấy giá trị từ
  const selectedCourseId = courses[indexToSelect]?.id;
  useEffect(() => {
    const fetchMyCourse = async () => {
      const userId = userLogin?.id;
      if (userLogin) {
        const courseData = await getDataById(COURSE_USER, userId);
        if (courseData && courseData.length > 0) {
          // Tìm kiếm course cụ thể dựa trên id
          const selectCourse = courseData.find(
            (course: any) => course.id == id
          );
          // Kiểm tra xem selectCourse có tồn tại
          if (selectCourse) {
            setCourses([selectCourse]);
          }
        }
      }
    };

    fetchMyCourse();
  }, [userLogin, id]);

  useEffect(() => {
    const fetchLessonUser = async () => {
      if (userLogin) {
        const lessonData = await getDataById(LESSON_USER, id as string);
        setLessons(lessonData);
      }
    };
    fetchLessonUser();
  }, [userLogin, id]);

  const handleCompleteLesson = async (answers: any) => {
    const updatedLessons = [...lessons];
    const lessonId = updatedLessons[currentLessonIndex].id;
    try {
      if (currentLessonIndex < updatedLessons.length - 1) {
        updatedLessons[currentLessonIndex].status = "complete";
        setCurrentLessonIndex((prevIndex) => prevIndex + 1);
        setLessons(updatedLessons);
        await updateData(LESSON_USER, lessonId, answers);
        const lessonData = await getDataById(LESSON_USER, id as string);
        setLessons(lessonData);
        navigate(`/User/MyCourse/${id}/${currentLessonIndex + 1}`);
      }else {

        alert("Chúc mừng! Bạn đã hoàn thành khóa học.");
        navigate("/User/MyCourse");
      }
    } catch (error) {
      setError(error as errorMessageCheckOut);
      setOpen(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSelectLesson = (index: any) => {
    if (
      index <= currentLessonIndex ||
      lessons[index - 1]?.status === "complete"
    ) {
      setCurrentLessonIndex(index);
    } else {
      alert("Bạn cần hoàn thành bài học trước đó trước khi chọn bài học mới");
    }
  };
  const completionPercentage =
    (lessons.filter((lesson) => lesson.status === "complete").length /
      lessons.length) *
    100;
  const currentLesson = lessons[currentLessonIndex];

  return (
    <div>
      <div className="courses-menu">
        <div className="container courses-menu">
          <div className="courses-menu-price">
            {courses?.map((course) => (
              <div className="p-3" key={course.id} id="title-course-name">
                {course.courses_name}
              </div>
            ))}
          </div>
          <div className="courses-menu-button">
            <a href="/courses.html" className="p-4-courses-link">
              <p>Các khóa học khác</p>
            </a>
            <a href="#" className="p-4-courses-link">
              <p>Tổng quan khóa học</p>
            </a>
          </div>
        </div>
      </div>
      <div id="course-menu">
        <div className="lesson">
          <div className="lesson-title">
            <h3>{currentLesson?.lesson_name}</h3>
            {currentLesson?.status !== "complete" && (
              <button onClick={handleCompleteLesson}>Hoàn thành bài học</button>
            )}
          </div>

          {currentLesson && (
            <Lesson
              currentLesson={currentLesson}
              onSubmit={handleCompleteLesson}
            />
          )}
        </div>
        <div className="info-course">
          <div className="progress-container">
            <div className="total-circlebar">
              <h4>Tiến độ khóa học</h4>
              <div className="percentage">
                <h4 id="completion-percentage">{`${completionPercentage}%`}</h4>
              </div>
            </div>
            <div className="stage-bar">
              {lessons.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  to={`/User/MyCourse/${id}/${index + 1}`}
                  className={`lesson-title-name ${
                    lesson.status === "complete" ? "complete-color" : ""
                  } ${
                    lesson.status === "processing" ? "processing-color" : ""
                  } ${
                    lesson.status === "uncompleted" ? "uncompleted-color" : ""
                  } ${currentLessonIndex === index ? "selected-lesson" : ""}`}
                  onClick={() => handleSelectLesson(index)}
                >
                  <span>{lesson.lesson_name}</span>
                  <span>
                    {lesson.status === "complete"
                      ? "Đã hoàn thành"
                      : lesson.status === "processing"
                      ? "Đang học"
                      : "Chưa học"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={() => handleClose()}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              {error.msgCheck}
            </Alert>
          </Snackbar>
        </Stack>
      </>
    </div>
  );
}

export default LessonsUser;
