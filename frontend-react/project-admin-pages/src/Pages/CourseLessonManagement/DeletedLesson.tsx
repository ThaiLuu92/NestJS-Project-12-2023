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
import { I_Course, I_Lesson } from "../../types/form.type";
import DeletedLessonModal from "./DeleteLessonModal";
import { GET_COURSE, GET_LESSON_TRASH, HARD_DELETE_ALL_COURSE, HARD_DELETE_COURSE, RESTORE_ALL_LESSON, RESTORE_COURSE } from "../../apis/common";


function DeletedLesson() {

    const [deletedLessons, setDeletedLessons] = useState<I_Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<I_Lesson | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [courses, setCourses] = useState<I_Course[]>([]);
  
  
    const columns: GridColDef[] = [
        {
          field: "id",
          headerName: "Mã số khóa học",
          flex: 0.3,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "name",
          headerName: "Tên bài học",
          flex: 0.7,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "courses",
          headerName: "Khóa học",
          flex: 0.5,
          headerAlign: "center",
          align: "center",
          valueGetter: (params) => {
            const lessonId = params.row.id;
            const lesson = deletedLessons.find((c) => c.id === lessonId);
            if (lesson) {
              const courseIds = lesson.courses_id;
              const coursesFilter = courses.filter((cat) => courseIds === cat.id);
              const courseNames = coursesFilter.map((cat) => cat.name);
              return courseNames.join(", ");
            }
            return "";
          },
        },
        {
          field: "lesson_img", // Cột hình ảnh
          headerName: "Hình ảnh",
          flex: 0.5,
          headerAlign: "center",
          align: "center",
          renderCell: (params) => (
            <img
              src={params.value} // URL hình ảnh
              alt={params.row.lessonName}
              style={{ maxWidth: "250px", maxHeight: "100%", objectFit: "cover" }}
            />
          ),
        },
        {
            field: "action",
            headerName: "Hành động",
            flex: 1.5,
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
                  onClick={() => handleRestoreLesson(params.row.id)}
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
                  onClick={() => handleDeleteLesson(params.row.id)}
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
      fetchCourses();
      fetchLessons();
    }, []);
  
    async function fetchLessons() {
      const getLesson = await getData(GET_LESSON_TRASH);
      setDeletedLessons(getLesson.data);
    }
  
    async function fetchCourses() {
      const getCourse = await getDataPaginatiton(GET_COURSE,{
        name: "",
        page: 1,
        pageSize: 100,
      });
      setCourses(getCourse.data);
    }
  
    const hanldeClose = () => {
      setModalOpen(false);
      setSelectedLesson(null);
    };
  
    const handleViewDetails = (id: string) => {
      const lesson = deletedLessons.find((lesson) => lesson.id === id);
      if (lesson) {
        setSelectedLesson(lesson);
        setModalOpen(true);
      }
    };
  
    const handleRestoreLesson = async (id: string) => {
      await restoreData(RESTORE_COURSE, id);
      fetchLessons();
    };
  
    const handleDeleteLesson = async (id: string) => {
      const confirmation = window.confirm(
        "Bạn có chắc là  muốn xóa  vĩnh viễn không ?"
      );
  
      if (confirmation) {
        await deleteData(HARD_DELETE_COURSE, id);
        fetchLessons();
      }
    };
  
    const handleDeleteAllDeletedLesson = async () => {
      const confirmation = window.confirm(
        "Bạn có chắc là  muốn xóa vĩnh viễn tất cả không ?"
      );
      if (confirmation) {
        await deleteAllDataByCondition(HARD_DELETE_ALL_COURSE);
        fetchLessons();
      }
    };

    const handleRestoreAllDeletedLesson = async () => {
      const confirmation = window.confirm(
        "Bạn có chắc là muốn khôi phục tất cả không ?"
      );
      if (confirmation) {
        await updateNoData(RESTORE_ALL_LESSON);
        fetchLessons();
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
              onClick={() => handleRestoreAllDeletedLesson()}
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
            onClick={() => handleDeleteAllDeletedLesson()}
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
          rows={deletedLessons}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
        />
      </>
      <DeletedLessonModal
        deletedLesson={selectedLesson}
        open={isModalOpen}
        onClose={hanldeClose}
        courses={courses}
      />
    </div>
    );
  }
  
  export default DeletedLesson;