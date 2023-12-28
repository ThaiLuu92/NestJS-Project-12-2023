import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  deleteAllDataByCondition,
  deleteData,
  getData,
  getDataPaginatiton,
  restoreData,
  updateNoData,
} from "../../apis/API";
import { I_Course, I_Lesson, I_Question } from "../../types/form.type";import {
  GET_COURSE,
  GET_LESSON,
  GET_QUESTION_TRASH,
  HARD_DELETE_ALL_QUESTION,
  HARD_DELETE_QUESTION,
  RESTORE_ALL_QUESTION,
  RESTORE_QUESTION,
} from "../../apis/common";

function DeletedQuestion() {
  const [deletedQuestion, setDeletedQuestion] = useState<I_Question[]>([]);
  const [courses, setCourses] = useState<I_Course[]>([]);
  const [lessons, setLessons] = useState<I_Lesson[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã câu hỏi",
      flex: 0.5,
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
        const question = deletedQuestion.find((c) => c.id === questionId);
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
        const question = deletedQuestion.find((c) => c.id === questionId);
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
            onClick={() => handleRestoreQuestion(params.row.id)}
            variant="contained"
            color="primary"
            style={{
              marginLeft: 5,
              cursor: "pointer",
            }}
          >
            Khôi phục
          </Button>
          <Button
            onClick={() => handleDeleteQuestion(params.row.id)}
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
  }, [page, pageSize, totalPages]);

  async function fetchQuestions() {
    const getQuestions = await getDataPaginatiton(GET_QUESTION_TRASH, {
      page: page,
      pageSize: pageSize,
    });
    setTotalPages(getQuestions.total);
    setDeletedQuestion(getQuestions.data);
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

  const handleRestoreQuestion = async (id: string) => {
    await restoreData(RESTORE_QUESTION, id);
    fetchQuestions();
  };

  const handleDeleteQuestion = async (id: string) => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn xóa  vĩnh viễn không ?"
    );

    if (confirmation) {
      await deleteData(HARD_DELETE_QUESTION, id);
      fetchQuestions();
    }
  };

  const handleDeleteAllDeleted= async () => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn xóa vĩnh viễn tất cả không ?"
    );
    if (confirmation) {
      await deleteAllDataByCondition(HARD_DELETE_ALL_QUESTION);
      fetchQuestions();
    }
  };

  const handleRestoreAllDeleted= async () => {
    const confirmation = window.confirm(
      "Bạn có chắc là muốn khôi phục tất cả không ?"
    );
    if (confirmation) {
      await updateNoData(RESTORE_ALL_QUESTION);
      fetchQuestions();
    }
  };
  return (
    <div>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginRight: "30px",
          }}
        >
          <h3 style={{ boxSizing: "border-box" }}>Các danh mục đã xóa</h3>{" "}
          <div>
            <Button
              onClick={() => handleRestoreAllDeleted()}
              variant="contained"
              color="success"
              style={{
                marginLeft: 5,
                cursor: "pointer",
              }}
            >
              Khôi phục toàn bộ
            </Button>
            <Button
              onClick={() => handleDeleteAllDeleted()}
              variant="contained"
              color="error"
              style={{
                marginLeft: 5,
                cursor: "pointer",
              }}
            >
              Xóa Hết
            </Button>
          </div>
        </div>

        <DataGrid
          className="disabled-focus"
          rows={deletedQuestion}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { page: page, pageSize: pageSize },
            },
          }}
          pageSizeOptions={[10, 15]}
        />
      </>
    </div>
  );
}

export default DeletedQuestion;