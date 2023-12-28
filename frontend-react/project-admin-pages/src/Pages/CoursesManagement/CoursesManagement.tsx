import React, { useState, useEffect, ChangeEvent } from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Box, FormControlLabel, Switch, TextField } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import { I_Course, I_Category } from "../../types/form.type";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  deleteData,
  getData,
  getDataPaginatiton,
  searchData,
  updateDataByPatch,
} from "../../apis/API";
import CoursesModal from "./CourseModal";
import { useTheme } from "@mui/material/styles";
import DeletedCourse from "./DeletedCourse";
import { GET_CATEGORY, GET_COURSE, GET_COURSE_SEARCH, SOFT_DELETE_COURSE, UPDATE_COURSE } from "../../apis/common";

function CoursesManagement() {
  const theme = useTheme();
  const [courses, setCourses] = useState<I_Course[]>([]);
  const [categorys, setCategorys] = useState<I_Category[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<I_Course | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalCourse, setOriginalCourse] = useState<I_Course[]>([]); // Sao lưu danh sách Course gốc
  const [showTrash, setShowTrash] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã ID",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "course_img", // Cột hình ảnh
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
      field: "name",
      headerName: "Tên khóa học",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Danh mục",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        const courseId = params.row.id;
        const course = courses.find((c) => c.id === courseId);
        if (course) {
          const categoryIds = course.category_id; // Giả sử bạn có một trường category_id chứa categoryId trong course
          const categories = categorys.filter((cat) => categoryIds == cat.id);
          const categoryNames = categories.map((cat) => cat.name);
          return categoryNames.join(", "); // Đưa ra một chuỗi kết hợp tên các danh mục
        }
        return "";
      },
    },
    {
      field: "price",
      headerName: "Giá",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        // Sử dụng toLocaleString để hiển thị giá trị theo định dạng số địa phương
        return params.value.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
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
            onClick={() => handleDeleteCourse(params.row.id)}
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
    fetchCategorys();
  }, [page, pageSize, totalPages, searchTerm]);

  async function fetchCourses() {
    const getCourse = await getDataPaginatiton(GET_COURSE, {
      name: searchTerm,
      page: page,
      pageSize: pageSize,
    });    
    setTotalPages(getCourse.total);
    setCourses(getCourse.data);
    setOriginalCourse(getCourse.data);
  }

  async function fetchCategorys() {
    const getCategory = await getDataPaginatiton(GET_CATEGORY,{
      name: "",
      page: 1,
      pageSize: 100,
    });    
    setCategorys(getCategory.data);
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
    setCourses(originalCourse); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };

  const toggleView = () => {
    setShowTrash((prevShowTrash) => !prevShowTrash);
    fetchCourses();
  };

  const handleOpenEdit = async (id: string) => {
    const course = courses.find((course) => course.id === id);
    setAction("edit");
    setSelectedCourse(course || null);
    setModalOpen(true);
  };

  const handleAddModal = async () => {
    setModalOpen(true);
    setAction("add");
  };

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedCourse(null);
    setAction("");
  };

  const handleDeleteCourse = async (id: string) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmation) {
      await deleteData(SOFT_DELETE_COURSE, id);
      fetchCourses();
    }
  };

  const handleViewDetails = (id: string) => {
    const course = courses.find((course) => course.id === id);
    if (course) {
      setAction("view");
      setSelectedCourse(course);
      setModalOpen(true);
    }
  };

  const handleToggleStatus = async (courseId: string) => {
    try {
      const courseToToggle = courses.find(
        (course) => course.id === courseId
      );
      if (courseToToggle) {
        const newStatus = !courseToToggle.status;
        courseToToggle.status = newStatus;
        await updateDataByPatch(UPDATE_COURSE, courseId, { status: newStatus });
        fetchCourses();
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
          <h1>Quản lý khóa học</h1>
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
              onClick={handleAddModal}
            >
              Thêm khóa học
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
              <Button variant="contained" color={showTrash ? "error" : "primary"} onClick={toggleView}>
                {showTrash ? "Thùng rác" : "Dữ liệu"}
              </Button>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            {showTrash ? (   <DataGrid
              className="disabled-focus"
              paginationMode="server"
              onPaginationModelChange={handle}
              rowCount={totalPages}
              rows={courses}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { page: page, pageSize: pageSize },
                },
              }}
              pageSizeOptions={[10, 15]}
            />): (<DeletedCourse/>)}
         
          </div>
        </Box>
      </Box>
      <CoursesModal
        course={selectedCourse}
        open={isModalOpen}
        onClose={hanldeClose}
        categorys={categorys}
        action={action}
        fetchCourses={fetchCourses}
      />
    </>
  );
}

export default CoursesManagement;
