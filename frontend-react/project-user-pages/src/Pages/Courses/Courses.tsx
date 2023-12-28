import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Input,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear"; // Import icon Clear
import { getData } from "../../Apis/API";
import { removeUnicode } from "../../Utils/RemoveUnicode";
import "./Courses.scss";
import { Link, useNavigate } from "react-router-dom";
import { I_Course, I_Category } from "../../Types/formData.type";
import { GET_CATEGORY, GET_COURSE } from "../../Apis/common";

export default function Courses() {
  const navagite = useNavigate();
  const [japaneseCourses, setJapaneseCourses] = useState<I_Course[]>([]);
  const [categorys, setCategorys] = useState<I_Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchCategory();
  }, []);

  const fetchCourses = async () => {
    const getCourse = await getData(GET_COURSE);

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const coursesWithNewFlag = getCourse.map((course: any) => ({
      ...course,
      isNew: new Date(course.createdAt) >= oneDayAgo,
    }));
    setJapaneseCourses(coursesWithNewFlag);
  };

  async function fetchCategory() {
    const getCategory = await getData(GET_CATEGORY);
    setCategorys(getCategory);
  }

  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(removeUnicode(value)); // Gọi hàm removeUnicode ở đây để loại bỏ dấu và các ký tự đặc biệt
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="main-center-bg">
      <Container>
        <div className="main-center container">
          <div className="main-center-title">
            <Typography variant="h4">Danh mục sản phẩm</Typography>
            <div className="search-bar">
              <div className="search-input">
                <Input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchTerm && (
                  <Button
                    onClick={clearSearch}
                    startIcon={<ClearIcon />}
                  ></Button>
                )}
              </div>
            </div>
          </div>

          <ul className="main-center-tabs" id="course-center-tabs">
            {categorys.map((category) => (
              <li key={category.id}>
                <a href="#">
                  <span>{category.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="list-courses">
          {categorys.map((category) => (
            <div className="main-menu-1 container jlpt" key={category.id}>
              <div className="main-menu-title" style={{ marginTop: "20px" }}>
                <Typography variant="h4">{category.name}</Typography>
              </div>

              <div className="list-courses-card">
                {japaneseCourses
                  .filter((course) => course.category_id == category.id)
                  .filter((course) => {
                    const courseName = course.name.toLowerCase();
                    const searchTermLower = removeUnicode(
                      searchTerm.toLowerCase()
                    );
                    return (
                      !searchTermLower || courseName.includes(searchTermLower)
                    );
                  })
                  .map((course) => (
                    <Card
                      key={course.id}
                      sx={{ maxWidth: 280, position: "relative" }}
                      className={
                        course.status === false
                          ? "card-disabled"
                          : "custom-card-media"
                      }
                    >
                      <CardMedia
                        component="img"
                        height="194"
                        image={
                          typeof course.course_img === "string"
                            ? course.course_img
                            : URL.createObjectURL(course.course_img)
                        }
                        alt="Học Online N5"
                      />
                      <CardHeader
                        className="custom-card-header"
                        title={course.name}
                      />
                      <CardContent className="custom-card-content">
                        <Typography variant="body1" color="text.secondary">
                          Giá VND: <span>{course.price.toLocaleString()}</span>
                        </Typography>
                        <Typography paragraph>
                          Thời gian: <span>{course.duration}</span>
                        </Typography>
                        <div className="centered-button">
                          <Button
                            onClick={() => {
                              if (course.status === true) {
                                navagite("/Checkout?id=" + course?.id);
                              }
                            }}
                            disabled={course.status === false}
                            style={{ fontSize: "16px", fontWeight: 700 }}
                          >
                            Mua ngay
                          </Button>
                        </div>
                        <Link
                          style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            cursor:
                              course.status === false ? "not-allowed" : "pointer",
                            color: course.status === false ? "grey" : "black",
                            pointerEvents:
                              course.status === false ? "none" : "auto",
                          }}
                          to={
                            course.status === false ? "#" : `/course/${course.id}`
                          }
                        >
                          Xem chi tiết
                        </Link>
                      </CardContent>
                      {course.isNew && (
                        <span
                          role="img"
                          aria-label="New Course"
                          className="new-course-icon"
                        >
                          <img
                            src="http://res.cloudinary.com/dr9lw2qk0/image/upload/v1701601192/xktdn9tsrvpvaiegcsxe.png"
                            alt="New Course"
                            className="blinking-icon"
                            width={65}
                          />
                        </span>
                      )}
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
