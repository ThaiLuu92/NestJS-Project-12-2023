import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  deleteAllDataByCondition,
  deleteData,
  getData,
  restoreData,
  updateNoData,
} from "../../apis/API";
import { I_Category } from "../../types/form.type";
import DeletedCategoryModal from "./DeletedCategoryModal";
import {
  GET_CATEGORY_TRASH,
  HARD_DELETE_ALL_CATEGORY,
  HARD_DELETE_CATEGORY,
  RESTORE_ALL_CATEGORY,
  RESTORE_CATEGORY,
} from "../../apis/common";
import { Box } from "@mui/material";

function DeletedCategory() {
  const [catagorys, setCatagorys] = useState<I_Category[]>([]);
  const [selectedCatagory, setSelectedCatagory] = useState<I_Category | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã khóa học",
      flex: 0.5,
      maxWidth: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      flex: 0.5,
      headerName: "Tên danh mục",
      maxWidth: 200,

      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      flex: 0.5,
      headerName: "Mô tả",
      maxWidth: 200,

      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Hành động",
      maxWidth: 600,
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
            onClick={() => handleRestoreCategory(params.row.id)}
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
    fetchCatagorys();
  }, []);

  async function fetchCatagorys() {
    const getCatagory = await getData(GET_CATEGORY_TRASH);
    setCatagorys(getCatagory.data);
  }

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedCatagory(null);
  };

  const handleViewDetails = (id: string) => {
    const catagory = catagorys.find((catagory) => catagory.id === id);
    if (catagory) {
      setSelectedCatagory(catagory);
      setModalOpen(true);
    }
  };

  const handleRestoreCategory = async (id: string) => {
    await restoreData(RESTORE_CATEGORY, id);
    fetchCatagorys();
  };
  const handleDeleteCategory = async (id: string) => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn xóa  vĩnh viễn không ?"
    );

    if (confirmation) {
      await deleteData(HARD_DELETE_CATEGORY, id);
      fetchCatagorys();
    }
  };

  const handleDeleteAllDeletedCategory = async () => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn xóa vĩnh viễn tất cả không ?"
    );
    if (confirmation) {
      await deleteAllDataByCondition(HARD_DELETE_ALL_CATEGORY);
      fetchCatagorys();
    }
  };

  const handleRestoreAllDeletedCategory = async () => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn khôi phục tất cả không ?"
    );
    if (confirmation) {
      await updateNoData(RESTORE_ALL_CATEGORY);
      fetchCatagorys();
    }
  };

  return (
    <>
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
              onClick={() => handleDeleteAllDeletedCategory()}
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

        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={catagorys}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 15]}
          />
        </Box>
      </>
      <DeletedCategoryModal
        catagory={selectedCatagory}
        open={isModalOpen}
        onClose={hanldeClose}
      />
    </>
  );
}

export default DeletedCategory;
