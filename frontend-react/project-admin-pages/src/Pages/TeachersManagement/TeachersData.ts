export interface Teacher {
  teacher_id: number; // Mã giáo viên
  full_name: string; // Họ và tên đầy đủ
  email: string; // Địa chỉ email
  phone: string; // Số điện thoại
  address: string; // Địa chỉ
  date_of_birth: string; // Ngày sinh (có thể dùng kiểu Date nếu bạn muốn)
  gender: "Male" | "Female" | "Other"; // Giới tính
  qualifications: string[]; // Danh sách bằng cấp và chứng chỉ
  subjects_taught: string[]; // Danh sách các môn học mà giáo viên dạy
  classes_taught: string[]; // Danh sách các lớp học mà giáo viên đang dạy
  ratings: number;
}
export const teachers: Teacher[] = [
  {
    teacher_id: 101,
    full_name: "Nguyễn Văn A",
    email: "teacherA@gmail.com",
    phone: "0123 456 789",
    address: "123 Đường ABC, Thành phố X",
    date_of_birth: "15/05/1980",
    gender: "Male",
    qualifications: ["JLPT N2", "Chứng chỉ dạy tiếng Nhật"],
    subjects_taught: ["Tiếng Nhật cơ bản", "Tiếng Nhật giao tiếp"],
    classes_taught: ["N5", "N4", "Lớp giao tiếp"],
    ratings: 4.5,
  },
  {
    teacher_id: 102,
    full_name: "Trần Thị B",
    email: "teacherB@yahoo.com",
    phone: "0987 654 321",
    address: "456 Đường XYZ, Thành phố Y",
    date_of_birth: "20/12/1990",
    gender: "Female",
    qualifications: ["JLPT N1", "Chứng chỉ giảng dạy tiếng Nhật"],
    subjects_taught: ["Tiếng Nhật nâng cao", "Đọc hiểu văn bản"],
    classes_taught: ["N2", "N1", "Lớp đọc hiểu"],
    ratings: 4.8,
  },
  {
    teacher_id: 103,
    full_name: "Lê Văn C",
    email: "teacherC@hotmail.com",
    phone: "0358 246 789",
    address: "789 Đường KLM, Thành phố Z",
    date_of_birth: "10/08/1985",
    gender: "Male",
    qualifications: ["JLPT N2", "Chứng chỉ dạy tiếng Nhật"],
    subjects_taught: ["Tiếng Nhật cho du lịch", "Tiếng Nhật kinh doanh"],
    classes_taught: ["Lớp du lịch", "Lớp kinh doanh", "Lớp học cá nhân"],
    ratings: 4.6,
  },
  {
    teacher_id: 104,
    full_name: "Phạm Thị D",
    email: "teacherD@outlook.com",
    phone: "0777 999 888",
    address: "567 Đường GHI, Thành phố W",
    date_of_birth: "25/03/1987",
    gender: "Female",
    qualifications: ["JLPT N3", "Chứng chỉ giảng dạy tiếng Nhật"],
    subjects_taught: ["Tiếng Nhật trẻ em", "Tiếng Nhật hội thoại"],
    classes_taught: ["Lớp trẻ em", "Lớp hội thoại", "Lớp cá nhân"],
    ratings: 4.7,
  },
  {
    teacher_id: 105,
    full_name: "Nguyễn Thanh E",
    email: "teacherE@gmail.com",
    phone: "0333 666 111",
    address: "888 Đường PQR, Thành phố V",
    date_of_birth: "05/09/1995",
    gender: "Male",
    qualifications: ["JLPT N2", "Chứng chỉ dạy tiếng Nhật"],
    subjects_taught: ["Tiếng Nhật chuyên ngành", "Tiếng Nhật thông dụng"],
    classes_taught: ["Lớp chuyên ngành", "Lớp tiếng Nhật cơ bản"],
    ratings: 4.4,
  },
  // Thêm thông tin về giáo viên khác tại đây
];
