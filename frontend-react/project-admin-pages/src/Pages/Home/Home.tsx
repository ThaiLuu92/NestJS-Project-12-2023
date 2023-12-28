import React, { useState, useEffect } from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Box, Card, CardContent, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import NavBar from "../../Components/NavBar/NavBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Orders from "./Orders";
import Title from "./Title";
import {
  I_Course,
  I_Category,
  I_Lesson,
  I_User,
  I_PaymentView,
} from "../../types/form.type";
import { Link as RouterLink } from "react-router-dom";
import { getData, getDataPaginatiton } from "../../apis/API";
import BasicPie from "./BasicPie";
import BasicLineChart from "./LineChart";
import {
  GET_CATEGORY,
  GET_COURSE,
  GET_LESSON,
  GET_PATMENT,
  GET_PATMENT_ALL,
  GET_USER,
} from "../../apis/common";
import { loginSuccess } from "../../Redux/Slice/appSlice";

function Home() {
  const [totalUser, setTotalUser] = useState<number>(0);
  const [courseData, setCourseData] = useState<number>(0);
  const [lessonData, setLessonData] = useState<number>(0);
  const [orderData, setOrderData] = useState<I_PaymentView[]>([]);
  const [catagoryData, setCatagoryData] = useState<number>(0);
  useEffect(() => {
    fetchUsers();
    fetchOders();
    fetchCatagorys();
    fetchCourses();
    fetchLessons();
  }, []);

  async function fetchUsers() {
    const getUser = await getDataPaginatiton(GET_USER, {
      user_name: "",
      page: 1,
      pageSize: 1,
    });
    setTotalUser(getUser.total);
  }

  async function fetchOders() {
    const getOder = await getData(GET_PATMENT_ALL);
    setOrderData(getOder);
  }

  async function fetchCatagorys() {
    const getCatagory = await getDataPaginatiton(GET_CATEGORY, {
      name: "",
      page: 1,
      pageSize: 1,
    });
    setCatagoryData(getCatagory.total);
  }

  async function fetchLessons() {
    const getLessions = await getDataPaginatiton(GET_LESSON, {
      name: "",
      page: 1,
      pageSize: 1,
    });
    setLessonData(getLessions.total);
  }

  async function fetchCourses() {
    const getCourse = await getDataPaginatiton(GET_COURSE, {
      name: "",
      page: 1,
      pageSize: 1,
    });
    setCourseData(getCourse.total);
  }

  const totalOrder = orderData.length;
  const totalRevenue = orderData.reduce((total, order) => {
    return total + order.course_price;
  }, 0);

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SlideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Dashboard</h1>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <Title>Biểu đồ số khóa học bán theo ngày</Title>
                  <BasicLineChart />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <Title>
                    Phần trăm danh mục đã bán theo tổng số khóa học bán ra
                  </Title>
                  <BasicPie />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title> Tổng Số Học Viên</Title>
                  <Typography component="p" variant="h4">
                    {totalUser}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString("en-US")}
                  </Typography>
                  <div>
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="/userManagement"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Tổng Danh mục</Title>
                  <Typography component="p" variant="h4">
                    {catagoryData}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString("en-US")}
                  </Typography>
                  <div>
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="/catagoryManagement"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Tổng Số Khóa Học</Title>
                  <Typography component="p" variant="h4">
                    {courseData}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString("en-US")}
                  </Typography>
                  <div>
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="/coursesManagement"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Tổng Số Bài Học</Title>
                  <Typography component="p" variant="h4">
                    {lessonData}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString("en-US")}
                  </Typography>
                  <div>
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="/courseLessonManagement"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Số Khóa học đã bán</Title>
                  <Typography component="p" variant="h4">
                    {totalOrder}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString("en-US")}
                  </Typography>
                  <div>
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="/oderManagement"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Tổng Doanh thu</Title>
                  <Typography component="p" variant="h4">
                    {totalRevenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString("vi-VN")}
                  </Typography>
                  <div>
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="/oderManagement"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Home;
