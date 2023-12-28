import React, { useState, useEffect } from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Box, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  deleteData,
  getDataPaginatiton,
  updateDataByPatch,
} from "../../apis/API";
import CatagoryModal from "./CatagoryModal";
import { I_Category } from "../../types/form.type";
import DeletedCategory from "./DeletedCategory";
import { useTheme } from "@mui/material/styles";
import {
  GET_CATEGORY,
  SOFT_DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../../apis/common";

function CatagoryManagement() {
  const theme = useTheme();
  const [catagorys, setCatagorys] = useState<I_Category[]>([]);
  const [selectedCatagory, setSelectedCatagory] = useState<I_Category | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalCatagorys, setOriginalCatagorys] = useState<I_Category[]>([]); // Sao lưu danh sách Course gốc
  const [showTrash, setShowTrash] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
      headerName: "Tên danh mục",
      flex: 0.5,
      maxWidth: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 0.5,
      maxWidth: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      maxWidth: 200,
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
  }, [page, pageSize, totalPages, searchTerm]);

  async function fetchCatagorys() {
    const getCatagory = await getDataPaginatiton(GET_CATEGORY, {
      name: searchTerm,
      page: page,
      pageSize: pageSize,
    });
    setTotalPages(getCatagory.total);
    setCatagorys(getCatagory.data);
    setOriginalCatagorys(getCatagory.data);
  }

  const handle = (a: any) => {
    setPage(a.page + 1);
    setPageSize(a.pageSize);
  };

  const handleSearch = async (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setCatagorys(originalCatagorys); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };

  const toggleView = () => {
    setShowTrash((prevShowTrash) => !prevShowTrash);
    fetchCatagorys();
  };

  const handleOpenEdit = async (id: string) => {
    const catagory = catagorys.find((catagory) => catagory.id === id);
    setAction("edit");
    setSelectedCatagory(catagory || null);
    setModalOpen(true);
  };

  const handleAddModal = async () => {
    setModalOpen(true);
    setAction("add");
  };

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedCatagory(null);
    setAction("");
  };

  const handleDeleteCategory = async (id: string) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmation) {
      await deleteData(SOFT_DELETE_CATEGORY, id);
      fetchCatagorys();
    }
  };

  const handleViewDetails = (id: string) => {
    const catagory = catagorys.find((catagory) => catagory.id === id);
    if (catagory) {
      setAction("view");
      setSelectedCatagory(catagory);
      setModalOpen(true);
    }
  };

  const handleToggleStatus = async (catagoryId: string) => {
    try {
      const categoryToToggle = catagorys.find(
        (catagory) => catagory.id === catagoryId
      );
      if (categoryToToggle) {
        const newStatus = !categoryToToggle.status;
        categoryToToggle.status = newStatus;
        await updateDataByPatch(UPDATE_CATEGORY, catagoryId, {
          status: newStatus,
        });
        fetchCatagorys();
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
        <Grid container spacing={2}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>Quản lý danh mục</h1>
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
                Thêm danh mục
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClear}
                >
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
                  rowCount={totalPages}
                  onPaginationModelChange={handle}
                  rows={catagorys}
                  columns={columns}
                  getRowId={(row) => row.id}
                  initialState={{
                    pagination: {
                      paginationModel: { page: page, pageSize: pageSize },
                    },
                  }}
                />
              ) : (
                <DeletedCategory />
              )}
            </div>
          </Box>
        </Grid>
      </Box>
      <CatagoryModal
        catagory={selectedCatagory}
        open={isModalOpen}
        onClose={hanldeClose}
        action={action}
        fetchCatagorys={fetchCatagorys}
      />
    </>
  );
}
export default CatagoryManagement;
