import React, { useState, useEffect } from 'react';
import { getDataById } from '../../Apis/API';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container
} from '@mui/material';
import Grid from "@mui/material/Grid";
import "./CoursesDetail.scss"
import { I_Course, I_Category } from '../../Types/formData.type';
import TeachersCards from '../../Components/TeachersCards/TeachersCards';
import { COURSE } from '../../Apis/common';



function CoursesDetail() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const { id } = useParams();
    const [japaneseCourse, setJapaneseCourse] = useState<I_Course | null>(null);
    const navagite = useNavigate()
    
    useEffect(() => {
        const fetchCourseDetail = async () => {
            if (id) {
                const courses = await getDataById(COURSE, id);
                setJapaneseCourse(courses);
            }
        };
        fetchCourseDetail();
    }, [id]);

    return (
        <>
        
            <div className="courses-menu" id="courses-menu-black">
                <Container>
                    <div className="container courses-menu">
                        <div className="courses-menu-price">
                          
                                <div className="p-3">{japaneseCourse?.name}</div>
                           
                        </div>
                        <div className="courses-menu-button">
                            <a href="/courses.html" className="p-4-courses-link">
                                <p>Các khóa học khác</p>
                            </a>
                            <a href="#" className="p-4-courses-try">
                                <p>Học thử</p>
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
            <Container className="course-detail-content">
                <Grid container>




                    <Grid item xs={6} className="course-content-img">
                        <img src="https://mba.globis.ac.jp/careernote/assets_c/2021/09/iStock-980725072%20%281%29%20%281%29%20%281%29-min-thumb-800x440-310.jpg" alt="" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <div className="course-board-infor" id="course-board">
                            <div className="board-title">{japaneseCourse?.name}</div>
                            <div className="board-name">
                                <span>ONLINE</span> {japaneseCourse?.level}
                            </div>
                            <div className="board-expired">Thời gian học {japaneseCourse?.duration} tháng</div>
                            <div className="board-price">
                                <span>VND</span> {japaneseCourse?.price.toLocaleString()}
                            </div>
                            <div className="board-btn">
                                <div className="board-btn">
                                    <button className="board-btn-ntv">Nhận tư vấn </button>
                                    {/* Nút để mở modal 1 */}
                                    <button onClick={() => navagite("/Checkout?id="+japaneseCourse?.id)}
                                        className="btn btn-primary board-btn-buy"
                                        data-bs-target="#exampleModalToggle"
                                        data-bs-toggle="modal"
                                    >
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Grid>

                </Grid>
            </Container>
            <div className="course-route-bg">
                <Container>
                    <div className="course-route container">
                        <div className="course-route-title">Lộ Trình Cơ Bản</div>
                        <div className="coure-route-bg">
                            <div className="course-route-content">
                                <div>
                                    <div className="route-sub">Nội Dung</div>
                                    <ul className="route-descripton">
                                        <li>Bảng chữ cái</li>
                                        <li>
                                            Buổi học kiến thức theo giáo trình minano nihongo (bao gồm Từ
                                            vựng + ngữ pháp + chữ Hán + đọc + nghe + hội thoại+ kiểm tra).
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="route-sub">Giáo trình</div>
                                    <ul className="route-descripton">
                                        <li>
                                            Giáo trình trung tâm biên soạn dựa trên nền tảng giáo trình
                                            Minnanihongo
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="route-sub">Điểm nổi bật</div>
                                    <ul className="route-descripton">
                                        <li>Học từ kiến thức căn bản.</li>
                                        <li>Trang bị kỹ năng học từ mới.</li>
                                        <li>Hướng dẫn chuẩn bị bài, học và ôn bài hiệu quả.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container className="course-extent container">
                <div className="course-extent-title">KHÓA N5 ĐEM ĐẾN CHO BẠN</div>
                <div className="extent-item">
                    <div className="extent-item-bg" id="item-bg-yellow">
                        <div className="extent-item-sub">
                            <p>
                                300,000 + sinh viên, người đi làm đã trải nghiệm và thành công với
                                khóa học Online
                            </p>
                        </div>
                    </div>
                    <div className="extent-item-bg" id="item-bg-green">
                        <div className="extent-item-sub">
                            <p>
                                Cung đầy đủ kiến thức và kĩ năng làm đề thi JLPT N5 chỉ trong duy
                                nhất 1 khóa học
                            </p>
                        </div>
                    </div>
                    <div className="extent-item-bg" id="item-bg-blue">
                        <div className="extent-item-sub">
                            <p>
                                Lộ trình học được cá nhân hóa đầu tiên tại Việt Nam, hỗ trợ đắc lực
                                cho người tự học
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <TeachersCards />

        </>
    )
}

export default CoursesDetail
