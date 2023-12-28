import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { I_CourseView } from "../../Types/formData.type";
import { getDataByCondition, getDataById } from "../../Apis/API";
import { AuthState } from "../../Redux/Slice/AuthSlice";
import { useSelector } from "react-redux";
import { COURSE_USER } from "../../Apis/common";
import "./MyCourse.scss"
import { Link } from "react-router-dom";

function MyCourse() {
  const userLogin = useSelector(
    (state: { auth: AuthState }) => state.auth.user
  );
  const [courses, setCourse] = useState<I_CourseView[]>([]);

  useEffect(() => {
    const fetchPayment = async () => {
      const id = userLogin?.id

      if (userLogin) {
        const courseData = await getDataById(COURSE_USER, id);        
        setCourse(courseData);
      }
    };
    fetchPayment();
  }, [userLogin]);

  return (
    <div>
      <h1>Khóa học của bạn</h1>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 15 }}
      >
        {courses?.map((course) => (
          <Link key={course.id} to={`/User/MyCourse/${course.id}`} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                width: "100%",
                height: "280px",
                padding: "10px",
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)', 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                  cursor: 'pointer'
                },
              }}
            >
              <CardMedia
                component="img"
                width="100%"
                style={{ objectFit: "contain" }}
                image={course.course_img}
                alt="C"
              />
              <CardContent sx={{ padding: "0", paddingTop: "5px" }}>
                <Typography gutterBottom variant="body1" component="div">
                  {course.courses_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày mua khóa học: {course.createdAt.split("T")[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Trạng thái: {course.status == "uncompelete" ? 'Chưa hoàn thành' : 'Đã hoàn thành'}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyCourse;
