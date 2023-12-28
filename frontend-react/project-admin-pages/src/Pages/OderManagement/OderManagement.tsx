import React, { useState, useEffect } from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { format } from "date-fns-tz";
import { Box } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import { I_PaymentView } from "../../types/form.type";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Switch, FormControlLabel } from "@mui/material";
import { Modal, Paper, Typography, TextField } from "@mui/material";
import { getData, getDataPaginatiton, updateData } from "../../apis/API";
import { removeUnicode } from "../../Utils/RemoveUnicode";
import { GET_PATMENT } from "../../apis/common";

function OderManagement() {
  const theme = useTheme();
  const [oders, setOders] = useState<I_PaymentView[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOder, setSelectedOder] = useState<I_PaymentView | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalOder, setOriginalOder] = useState<I_PaymentView[]>([]); // Sao lưu danh sách users gốc
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const convertToVnTimezone = (date: any) => {
    return format(date, "yyyy-MM-dd HH:mm:ss", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user_name",
      headerName: "Tên học viên",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "course_name",
      headerName: "Tên khóa học",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "course_price",
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
      field: "createdAt",
      headerName: "Ngày mua",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        const createdAt = params.row.createdAt;
        // Chuyển đổi ngày giờ sang múi giờ Việt Nam
        const vnTime = convertToVnTimezone(new Date(createdAt));
        return vnTime;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
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
            Xem thông tin
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchOders();
  }, [page, pageSize, totalPages, searchTerm]);

  async function fetchOders() {
    const getOder = await getDataPaginatiton(GET_PATMENT, {
      user_name: searchTerm,
      page: page,
      pageSize: pageSize,
    });
    setTotalPages(getOder.total);
    setOders(getOder.data);
    setOriginalOder(getOder.data);
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
    setOders(originalOder); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };

  const handleViewDetails = (id: string) => {
    const oder = oders.find((oder) => oder.id === id);
    if (oder) {
      setSelectedOder(oder);
      setModalOpen(true);
    }
  };


  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SlideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý mua khóa học</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
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
          <div style={{ width: "100%" }}>
            <DataGrid
             paginationMode="server"
              className="disabled-focus"
              rows={oders}
              rowCount={totalPages}
              onPaginationModelChange={handle}

              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { page: page, pageSize: pageSize },
                },
              }}
              pageSizeOptions={[10, 15]}
         
            />
          </div>
        </Box>
      </Box>
      <OderDetailsModal oder={selectedOder} open={isModalOpen} onClose={() => setModalOpen(false)}  convertToVnTimezone={convertToVnTimezone}/>
    </>
  );
}

export default OderManagement;

// UserDetailsModal.tsx
interface OderDetailsModalProps {
    oder: I_PaymentView | null;
    open: boolean;
    onClose: () => void;
    convertToVnTimezone: Function;
}
const OderDetailsModal: React.FC<OderDetailsModalProps> = ({ oder, open, onClose, convertToVnTimezone }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Thông tin khóa học đã mua
                </Typography>
                {oder && (
                    <Paper sx={{ p: 2, maxWidth: "800px", maxHeight: "600px", overflow: "auto"  }}>
                        <form style={{ margin: "8px", minWidth: "120px", width: "95%" }}>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="id">ID</label>
                                <input
                                    type="text"
                                    id="id"
                                    value={oder.id}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="user_name">Tên Học Viên</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    value={oder.user_name}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="user_email">Email Học Viên</label>
                                <input
                                    type="text"
                                    id="user_email"
                                    value={oder.user_email}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="category_name">Tên Danh Mục</label>
                                <input
                                    type="text"
                                    id="category_name"
                                    value={oder.category_name}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="course_name">Tên khóa học</label>
                                <input
                                    type="text"
                                    id="course_name"
                                    value={oder.course_name}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="course_price">Giá của khóa học</label>
                                <input
                                    type="text"
                                    id="course_price"
                                    value={oder.course_price.toLocaleString()}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="createAt">Ngày mua</label>
                                <input
                                    type="text"
                                    id="createAt"
                                    value={convertToVnTimezone(new Date(oder.createdAt))}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            
                        </form>
                    </Paper>
                )}
                <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={onClose}>
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
};
