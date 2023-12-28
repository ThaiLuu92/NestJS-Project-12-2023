import React, { useState, useEffect, ChangeEvent } from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Autocomplete, Box, Grid, Input, TextField } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  createDataWithImage,
  deleteData,
  getDataPaginatiton,
  updateData,
} from "../../apis/API";
import QuestionModal from "./QuestionModal";
import { I_Course, I_Lesson, I_Question } from "../../types/form.type";
import { useTheme } from "@mui/material/styles";
import {
  GET_COURSE,
  GET_LESSON,
  GET_QUESTION,
  IMPORT_CSV_QUESTION,
  SOFT_DELETE_QUESTION,
} from "../../apis/common";
import DeletedQuestion from "./DeleteQuestion";

function QuestionManagement() {
  const theme = useTheme();
  const [questions, setQuestions] = useState<I_Question[]>([]);
  const [courses, setCourses] = useState<I_Course[]>([]);
  const [lessons, setLessons] = useState<I_Lesson[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<I_Question | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTermCourse, setSearchTermCourse] = useState<string | undefined>(
    ""
  ); // State để lưu trữ từ khóa tìm kiếm
  const [searchTermLesson, setSearchTermLesson] = useState<string | undefined>(
    ""
  ); // State để lưu trữ từ khóa tìm kiếm
  const [showTrash, setShowTrash] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFile, setSelectedFile] = useState({});

  const [valueOptionCourse, setValueOptionCourse] = useState<
    I_Course | undefined
  >();
  const [lessonOptions, setLessonOptions] = useState<I_Lesson[]>([]);
  const [valueOptionLesson, setValueOptionLesson] = useState<
    I_Lesson | undefined
  >();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã câu hỏi",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "question_text",
      headerName: "Nội dung câu hỏi",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "course",
      headerName: "Khóa học",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        const questionId = params.row.id;
        const question = questions.find((c) => c.id === questionId);
        if (question) {
          const courseIds = question.courses_id;
          const coursesFilter = courses.filter((cat) => courseIds == cat.id);
          const courseNames = coursesFilter.map((cat) => cat.name);
          return courseNames.join(", ");
        }
        return "";
      },
    },
    {
      field: "lesson",
      headerName: "Bài học",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        const questionId = params.row.id;
        const question = questions.find((c) => c.id === questionId);
        if (question) {
          const lessonIds = question.lesson_id;
          const lessonsFilter = lessons.filter(
            (lesson) => lessonIds == lesson.id
          );
          const lessonNames = lessonsFilter.map((lesson) => lesson.name);
          return lessonNames.join(", ");
        }
        return "";
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => handleViewDetails(params.row.id)}
            variant="contained"
            style={{
              backgroundColor: "blue",
              color: "white",
              cursor: "pointer",
            }}
          >
            Xem
          </Button>
          <Button
            onClick={() => handleOpenEdit(params.row.id)}
            variant="contained"
            color="primary"
            style={{
              marginLeft: 5,
              cursor: "pointer",
            }}
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDeleteCategory(params.row.id)}
            variant="contained"
            color="secondary"
            style={{
              marginLeft: 5,
              cursor: "pointer",
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchQuestions();
    fetchCourses();
    fetchLessons();
  }, [page, pageSize, totalPages, searchTermCourse, searchTermLesson]);

  async function fetchQuestions() {
    const getQuestions = await getDataPaginatiton(GET_QUESTION, {
      courses_id: searchTermCourse,
      lesson_id: searchTermLesson,
      page: page,
      pageSize: pageSize,
    });
    setTotalPages(getQuestions.total);
    setQuestions(getQuestions.data);
    setSelectedQuestion(getQuestions.data);
  }

  async function fetchCourses() {
    const getCourse = await getDataPaginatiton(GET_COURSE, {
      name: "",
      page: 1,
      pageSize: 100,
    });
    setCourses(getCourse.data);
  }

  async function fetchLessons() {
    const getLessons = await getDataPaginatiton(GET_LESSON, {
      name: "",
      page: 1,
      pageSize: 100,
    });
    setLessons(getLessons.data);
  }

  const handle = (a: any) => {
    setPage(a.page + 1);
    setPageSize(a.pageSize);
  };

  const handleSearch = () => {
    const courses_id = valueOptionCourse?.id;
    const lessons_id = valueOptionLesson?.id;
  
    setSearchTermCourse(courses_id || "");
    setSearchTermLesson(lessons_id || "");
  };

  const toggleView = () => {
    setShowTrash((prevShowTrash) => !prevShowTrash);
    fetchQuestions();
  };

  const handleOpenEdit = async (id: string) => {
    const question = questions.find((question) => question.id === id);
    setAction("edit");
    setSelectedQuestion(question || null);
    setModalOpen(true);
  };

  const handleAddModal = async () => {
    setModalOpen(true);
    setAction("add");
  };

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedQuestion(null);
    setAction("");
  };

  const handleDeleteCategory = async (id: string) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmation) {
      await deleteData(SOFT_DELETE_QUESTION, id);
      fetchQuestions();
    }
  };

  const handleViewDetails = (id: string) => {
    const question = questions.find((question) => question.id === id);
    if (question) {
      setAction("view");
      setSelectedQuestion(question);
      setModalOpen(true);
    }
  };

  const handleAddCSVFile = async () => {
    await createDataWithImage(IMPORT_CSV_QUESTION, selectedFile);
    fetchQuestions();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      setSelectedFile({ [name]: files[0] });
    }
  };

  const handleSelectChangeCourse = (nameCourse: string) => {
    const courseOption = courses?.find((item) => item.name === nameCourse);
    if (courseOption) {
      return setValueOptionCourse(courseOption);
    }
    setValueOptionCourse(undefined);
  };
  const handleSelectChangeLesson = (nameLesson: string) => {
    const lessonOption = lessonOptions?.find(
      (item) => item.name === nameLesson
    );
    if (lessonOption) {
      return setValueOptionLesson(lessonOption);
    }
    setValueOptionLesson(undefined);
  };

  useEffect(() => {
    const updatedLessonOptions =
      lessons?.filter((lesson) => lesson.courses_id == valueOptionCourse?.id) ||
      [];
    setLessonOptions(updatedLessonOptions);
  }, [valueOptionCourse]);

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SlideBar />
        {/* <Grid container spacing={2}> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý câu hỏi</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "160px",
              marginBottom: "10px",
            }}
          >
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddModal}
              >
                Thêm danh mục
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Autocomplete
                size="small"
                disablePortal
                id="courses_id"
                options={courses}
                value={valueOptionCourse}
                onInputChange={(event, newValue) => {
                  handleSelectChangeCourse(newValue);
                }}
                sx={{ width: 150 }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Khóa học" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="lesson_id"
                options={lessonOptions}
                value={valueOptionLesson}
                onInputChange={(event, newValue) => {
                  handleSelectChangeLesson(newValue);
                }}
                sx={{ width: 150 }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Bài học" />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Lọc
              </Button>
            </div>
            <div
              style={{
                width: "155px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color={showTrash ? "error" : "primary"}
                onClick={toggleView}
              >
                {showTrash ? "Thùng rác" : "Dữ liệu"}
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCSVFile}
            >
              Import CSV
            </Button>
            <Input
              type="file"
              id="file_csv"
              name="file_csv"
              onChange={handleInputChange}
              style={{ width: "300px" }}
            />
          </div>
          <div style={{ width: "100%" }}>
            {showTrash ? (
              <DataGrid
                className="disabled-focus"
                paginationMode="server"
                rowCount={totalPages}
                onPaginationModelChange={handle}
                rows={questions}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: {
                    paginationModel: { page: page, pageSize: pageSize },
                  },
                }}
                pageSizeOptions={[10, 15, 20, 30]}
              />
            ) : (
              <DeletedQuestion />
            )}
          </div>
        </Box>
        {/* </Grid> */}
      </Box>
      <QuestionModal
        quesion={selectedQuestion}
        courses={courses}
        lessons={lessons}
        open={isModalOpen}
        onClose={hanldeClose}
        action={action}
        fetchQuestions={fetchQuestions}
      />
    </>
  );
}
export default QuestionManagement;
