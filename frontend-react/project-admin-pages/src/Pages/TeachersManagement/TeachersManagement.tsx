import React, { useState } from 'react';
import SlideBar from '../../Components/SlideBar/SlideBar';
import { Box } from '@mui/material';
import NavBar from '../../Components/NavBar/NavBar';
import { teachers, Teacher } from './TeachersData';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {
  Modal,
  Paper,
  Typography,
  TextField,
} from '@mui/material';


function TeachersManagement() {
  const columns: GridColDef[] = [
    { field: 'teacher_id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
    { field: 'full_name', headerName: 'Họ và tên', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'date_of_birth', headerName: 'Ngày tháng năm sinh', width: 190, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Email', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'phone', headerName: 'Số điện thoại', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'ratings', headerName: 'Đánh giá', width: 140, headerAlign: 'center', align: 'center' },

    {
      field: 'action',
      headerName: 'Hành động',
      width: 250,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => handleViewDetails(params.row.teacher_id)}
            variant="contained"
            style={{
              backgroundColor: 'blue',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Xem
          </Button>
          <Button
            // onClick={() => handleUpdateTeacher(params.row)}
            variant="contained"
            color="primary"
            style={{
              marginLeft: 5,
              cursor: 'pointer',
            }}
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDeleteTeacher(params.row.teacher_id)}
            variant="contained"
            color="secondary"
            style={{
              marginLeft: 5,
              cursor: 'pointer',
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isCreateMode, setCreateMode] = useState(false);
  const [isUpdateMode, setUpdateMode] = useState(false);

  const handleViewDetails = (id: number) => {
    const teacher = teachers.find(teacher => teacher.teacher_id === id)
    if (teacher) {
      setSelectedTeacher(teacher);
      setModalOpen(true);
    }
    
  };

 

  // const handleCreateTeacher = () => {
  //   setSelectedTeacher(null);
  //   setCreateMode(true);
  //   setUpdateMode(false);
  // };

  // const handleUpdateTeacher = (teacher: Teacher) => {
  //   setSelectedTeacher(teacher);
  //   setCreateMode(false);
  //   setUpdateMode(true);
  // };

  const handleDeleteTeacher = (teacherId: number) => {
    const teacherDelete = teachers.filter((teacher) => teacher.teacher_id !== teacherId);
    console.log(teacherDelete);
    
    if (teacherDelete.length > 0) {
      
    }

   
  };


  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <SlideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý giảng viên</h1>
          <Button variant="contained" color="primary" style={{marginBottom: 20}} >
            Thêm giảng viên
          </Button>
          
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid
              className='disabled-focus'
              rows={teachers}
              columns={columns}
              getRowId={(row) => row.teacher_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
            />
          </div>
  
        </Box>
      </Box>
      <TeachersModal teacher={selectedTeacher} open={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default TeachersManagement;

interface TeachersModalProps {
  teacher: Teacher | null;
  open: boolean;
  onClose: () => void;
}
const TeachersModal: React.FC<TeachersModalProps> = ({ teacher, open, onClose }) => {
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
          Thông tin giảng viên
        </Typography>
        {teacher && (
          <Paper sx={{ p: 2, maxWidth: '800px', maxHeight: '600px', overflow: 'auto' }}>
            <form>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="teacher_id">ID</label>
                <input
                  type="text"
                  id="teacher_id"
                  value={teacher.teacher_id}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="full_name">Họ và tên</label>
                <input
                  type="text"
                  id="full_name"
                  value={teacher.full_name}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={teacher.email}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  value={teacher.phone}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  value={teacher.address}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="date_of_birth">Ngày tháng năm sinh</label>
                <input
                  type="text"
                  id="date_of_birth"
                  value={teacher.date_of_birth}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="gender">Giới tính</label>
                <input
                  type="text"
                  id="gender"
                  value={teacher.gender}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="qualifications">Trình độ</label>
                <input
                  type="text"
                  id="qualifications"
                  value={teacher.qualifications?teacher.qualifications.join(', '):''}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="subjects_taught">Môn học dạy</label>
                <input
                  type="text"
                  id="subjects_taught"
                  value={teacher.subjects_taught?teacher.subjects_taught.join(', '):''}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="classes_taught">Lớp học</label>
                <input
                  type="text"
                  id="classes_taught"
                  value={teacher.classes_taught?teacher.classes_taught.join(', '):''}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="ratings">Đánh giá</label>
                <input
                  type="text"
                  id="ratings"
                  value={teacher.ratings ? teacher.ratings.toString() : ''}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  
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
