import React, { useState, useEffect, ChangeEvent } from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Box, FormControlLabel, Switch, TextField } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import { I_Course, I_Lesson } from "../../types/form.type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  deleteData,
  getData,
  getDataPaginatiton,
  searchData,
  updateDataByPatch,
} from "../../apis/API";
import LessonModal from "./LessonModal";
import { useTheme } from "@mui/material/styles";
import DeletedLesson from "./DeletedLesson";
import {
  GET_COURSE,
  GET_LESSON,
  GET_LESSON_SEARCH,
  SOFT_DELETE_LESSON,
  UPDATE_LESSON,
} from "../../apis/common";

function CourseLessonManagement() {
  const theme = useTheme();
  const [lessons, setLessons] = useState<I_Lesson[]>([]);
  const [courses, setCourses] = useState<I_Course[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<I_Lesson | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalLesson, setOriginalLesson] = useState<I_Lesson[]>([]); // Sao lưu danh sách Course gốc
  const [showTrash, setShowTrash] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const lessonColumns: GridColDef[] = [
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
        const lesson = lessons.find((c) => c.id === lessonId);
        if (lesson) {
          const courseIds = lesson.courses_id;
          const coursesFilter = courses.filter((cat) => courseIds == cat.id);
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
      field: "status",
      headerName: "Status",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Switch
                checked={params.value}
                onChange={() => handleToggleStatus(params.row.id)}
                name="status-toggle"
              />
            }
            label={params.value ? "Active" : "Blocked"}
          />
        </div>
      ),
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
            onClick={() => handleViewLessonDetails(params.row.id)}
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
            onClick={() => handleOpenEditLesson(params.row.id)}
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
    fetchLessons();
    fetchCourses();
  }, [page, pageSize, totalPages, searchTerm]);

  async function fetchLessons() {
    const getLessions = await getDataPaginatiton(GET_LESSON, {
      name: searchTerm,
      page: page,
      pageSize: pageSize,
    });
    setTotalPages(getLessions.total);
    setLessons(getLessions.data);
    setOriginalLesson(getLessions.data);
  }

  async function fetchCourses() {
    const getCourse = await getDataPaginatiton(GET_COURSE, {
      name: "",
      page: 1,
      pageSize: 100,
    });
    setCourses(getCourse.data);
  }

  const handle = (a: any) => {
    setPage(a.page + 1);
    setPageSize(a.pageSize);
  };

  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setLessons(originalLesson); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };

  const toggleView = () => {
    setShowTrash((prevShowTrash) => !prevShowTrash);
    fetchLessons();
  };

  const handleOpenEditLesson = async (id: string) => {
    const lesson = lessons.find((lesson) => lesson.id === id);
    setAction("edit");
    setSelectedLesson(lesson || null);
    setModalOpen(true);
  };

  const handleAddModalLesson = async () => {
    setModalOpen(true);
    setAction("add");
  };

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedLesson(null);
    setAction("");
  };
  const handleDeleteLesson = async (id: string) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmation) {
      await deleteData(SOFT_DELETE_LESSON, id);
      fetchLessons();
    }
  };
  const handleViewLessonDetails = (id: string) => {
    const lesson = lessons.find((lesson) => lesson.id === id);
    if (lesson) {
      setAction("view");
      setSelectedLesson(lesson);
      setModalOpen(true);
    }
  };

  const handleToggleStatus = async (lessonId: string) => {
    try {
      const lessonToToggle = lessons.find((lesson) => lesson.id === lessonId);
      if (lessonToToggle) {
        const newStatus = !lessonToToggle.status;
        lessonToToggle.status = newStatus;
        await updateDataByPatch(UPDATE_LESSON, lessonId, { status: newStatus });
        fetchLessons();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SlideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý bài học</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "160px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddModalLesson}
            >
              Thêm bài học
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <TextField
                label="Tìm kiếm"
                value={searchTerm}
                onChange={handleSearch}
                variant="outlined"
                size="small"
              />
              <Button variant="contained" color="primary" onClick={handleClear}>
                Clear
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

          <div style={{ width: "100%" }}>
            {showTrash ? (
              <DataGrid
                className="disabled-focus"
                paginationMode="server"
                onPaginationModelChange={handle}
                rowCount={totalPages}
                rows={lessons}
                columns={lessonColumns}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: {
                    paginationModel: { page: page, pageSize: pageSize },
                  },
                }}
                pageSizeOptions={[10, 15, 20, 30]}
              />
            ) : (
              <DeletedLesson />
            )}
          </div>
        </Box>
      </Box>
      <LessonModal
        open={isModalOpen}
        onClose={hanldeClose}
        courses={courses}
        lesson={selectedLesson}
        action={action}
        fetchLessons={fetchLessons}
      />
    </>
  );
}

export default CourseLessonManagement;
