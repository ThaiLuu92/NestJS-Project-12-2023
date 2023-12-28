import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./style.scss";
import TeachersCards from "../../Components/TeachersCards/TeachersCards";

export default function Home() {

  return (
    <>
      <Container className="watchword">
        <Grid container>
          <Grid item xs={8} className="watchword-content">
            <Typography variant="h2">
              異なる言語は人生の異なるビジョンである
            </Typography>
            <Typography variant="body1">
              A different language is a different vision of life
            </Typography>
            <Typography variant="body1">
              Một ngôn ngữ mới là một thế giới mới
            </Typography>
            <div className="button-home">
              <Button
                variant="contained"
                color="primary"
                id="btn-watchword-test"
              >
                Làm bài test kiểm tra năng lực tiếng Nhật
              </Button>
            </div>
          </Grid>
          <Grid item xs={4} className="watchword-img">
            {/* <div id="watchword-img-cr"></div> */}
          </Grid>
        </Grid>
      </Container>
      <div className="course-self-learning">
        <Container>
          <Grid container className="course-self-learning-gird">
            <Grid item xs={4} className="course-images">

            </Grid>
            <Grid item xs={8} className="course-content">
              <Typography variant="h4" component="h3" sx={{
                mb: 2, fontWeight: 700, backgroundColor: '#EEFFDF', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                padding: '10px',
                borderRadius: '10px',
              }}>
                Tiếng Nhật Online chủ động
              </Typography>
              <Typography variant="body1" component="p" sx={{ mb: 2, fontSize: 24, fontWeight: 700 }}>
                Học online qua video bài giảng, hệ thống bài test
              </Typography>
              <Typography variant="body1" component="p">
                Với lộ trình được cá nhân hóa và hệ thống bài giảng lên tới hàng nghìn video/bài test, khóa học cam kết cung cấp đầy đủ kiến thức theo từng level khác nhau.
              </Typography>
            </Grid>

          </Grid>
        </Container>
      </div>

      <Container className="course-teacher-learning">
        <Grid container className="course-teacher-learning-gird">
          <Grid item xs={8} className="course-content">
            <Typography variant="h4" component="h3" sx={{
              mb: 2, fontWeight: 700, backgroundColor: '#FFE179', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              padding: '10px',
              borderRadius: '10px',
            }}>
              Lớp Online Có Giáo Viên
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2, fontSize: 24, fontWeight: 700 }}>
              Học trực tiếp với giáo viên qua Zoom, Livestream
            </Typography>
            <Typography variant="body1" component="p">
              Là hình thức học kết hợp giữa khóa online, với các buổi học trực
              tiếp với giáo viên qua Zoom, Livestream, khóa học theo sát quá
              trình học tập của học viên, đảm bảo kết quả đầu ra.
            </Typography>
          </Grid>
          <Grid item xs={4} className="course-images">

          </Grid>

        </Grid>
      </Container>
      <div className="course-offline-learning">
        <Container>
          <Grid container className="course-offline-learning-gird">
            <Grid item xs={4} className="course-images">

            </Grid>
            <Grid item xs={8} className="course-content">
              <Typography variant="h4" component="h3" sx={{
                mb: 2, fontWeight: 700, backgroundColor: '#E5D9FF', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                padding: '10px',
                borderRadius: '10px',
              }}>
                Tiếng Nhật OFFLINE
              </Typography>
              <Typography variant="body1" component="p" sx={{ mb: 2, fontSize: 24, fontWeight: 700 }}>
                Học trực tiếp tại các cơ sở ở Hà Nội, TP. HCM, Hải Phòng, Đà Nẵng
                cùng các giảng viên giàu kinh nghiệm
              </Typography>
              <Typography variant="body1" component="p">
                Lớp học trực tiếp có giáo viên kèm cặp, cam kết đảm bảo đầu ra
                bằng văn bản .
              </Typography>
            </Grid>

          </Grid>
        </Container>
      </div>
      <Container className="course-teacher-learning">
        <Grid container className="course-teacher-learning-gird">
          <Grid item xs={8} className="course-content">
            <Typography variant="h4" component="h3" sx={{
              mb: 2, fontWeight: 700, backgroundColor: '#C7E1FF', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              padding: '10px',
              borderRadius: '10px',
            }}>
              Thư viện sách KAKEHASHI
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2, fontSize: 24, fontWeight: 700 }}>
              Thư viện sách được được sưu tầm từ KAKEHASHI
            </Typography>
            <Typography variant="body1" component="p" sx={{
              mb: 2
            }} >
              Những cuốn sách giúp các học viên có kiến thức đầy đủ hơn về từ
              vựng, ngữ pháp, kanji, đọc hiểu.
            </Typography>
            <Stack direction="row" spacing={2} id="btn-group-cb">
              <Button
                variant="contained"
                sx={{
                  color: '#7CA4FF',
                  fontWeight: 700,
                  backgroundColor: 'white',
                  borderColor: '#7CA4FF',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  '&:hover': {
                    backgroundColor: '#7CA4FF',
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 700,
                  },
                }}
              >
                SƠ CẤP
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: '#7CA4FF',
                  fontWeight: 700,
                  backgroundColor: 'white',
                  borderColor: '#7CA4FF',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  '&:hover': {
                    backgroundColor: '#7CA4FF',
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 700,
                  },
                }}
              >
                TRUNG CẤP
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: '#7CA4FF',
                  fontWeight: 700,
                  backgroundColor: 'white',
                  borderColor: '#7CA4FF',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  '&:hover': {
                    backgroundColor: '#7CA4FF',
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 700,
                  },
                }}
              >
                CAO CẤP
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={4} className="course-images">

          </Grid>

        </Grid>
      </Container>
      <TeachersCards />




    </>
  );
}
