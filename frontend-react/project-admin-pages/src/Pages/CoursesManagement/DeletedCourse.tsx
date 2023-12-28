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
import { I_Course, I_Category } from "../../types/form.type";
import DeletedCourseModal from "./DeletedCourseModal";
import {
  GET_CATEGORY,
  GET_COURSE_TRASH,
  HARD_DELETE_ALL_COURSE,
  HARD_DELETE_COURSE,
  RESTORE_ALL_COURSE,
  RESTORE_COURSE,
} from "../../apis/common";

function DeletedCourse() {
  const [deletedCourses, setDeletedCourses] = useState<I_Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<I_Course | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [categorys, setCategorys] = useState<I_Category[]>([]);

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
        const course = deletedCourses.find((c) => c.id === courseId);
        if (course) {
          const categoryIds = course.category_id; // Giả sử bạn có một trường category_id chứa categoryId trong course
          const categories = categorys.filter((cat) => categoryIds === cat.id);
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
            onClick={() => handleRestoreCourse(params.row.id)}
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
  }, []);

  async function fetchCourses() {
    const getCourse = await getData(GET_COURSE_TRASH);
    setDeletedCourses(getCourse.data);
  }

  async function fetchCategorys() {
    const getCategory = await getDataPaginatiton(GET_CATEGORY, {
      name: "",
      page: 1,
      pageSize: 100,
    });
    setCategorys(getCategory.data);
  }

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const handleViewDetails = (id: string) => {
    const course = deletedCourses.find((course) => course.id === id);
    if (course) {
      setSelectedCourse(course);
      setModalOpen(true);
    }
  };

  const handleRestoreCourse = async (id: string) => {
    await restoreData(RESTORE_COURSE, id);
    fetchCourses();
  };

  const handleDeleteCourse = async (id: string) => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn xóa  vĩnh viễn không ?"
    );

    if (confirmation) {
      await deleteData(HARD_DELETE_COURSE, id);
      fetchCourses();
    }
  };

  const handleDeleteAllDeletedCourse = async () => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn xóa vĩnh viễn tất cả không ?"
    );
    if (confirmation) {
      await deleteAllDataByCondition(HARD_DELETE_ALL_COURSE);
      fetchCourses();
    }
  };

  const handleRestoreAllDeletedCategory = async () => {
    const confirmation = window.confirm(
      "Bạn có chắc là muốn khôi phục tất cả không ?"
    );
    if (confirmation) {
      await updateNoData(RESTORE_ALL_COURSE);
      fetchCourses();
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
              onClick={() => handleRestoreAllDeletedCategory()}
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
              onClick={() => handleDeleteAllDeletedCourse()}
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
          rows={deletedCourses}
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
      <DeletedCourseModal
        deletedCourses={selectedCourse}
        open={isModalOpen}
        onClose={hanldeClose}
        categorys={categorys}
      />
    </div>
  );
}

export default DeletedCourse;
