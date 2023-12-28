import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./CouresesCard.scss"
import { Button } from '@mui/material';
import { I_Course } from '../../Types/formData.type';
import { useEffect, useState } from 'react';
import { getData } from '../../Apis/API';


export default function CouresesCard() {

    const [japaneseCourses, setJapaneseCourses] = useState<I_Course[]>([]);
    useEffect(() => {
        fetchCourses();

    }, []);
    async function fetchCourses() {
        const getCourse = await getData("course")
        setJapaneseCourses(getCourse)

    }

    return (
        <>
            {japaneseCourses.map((course) => (<Card key={course.id} sx={{ maxWidth: 270 }}>
                <CardHeader className="custom-card-header" title={course.name} />
                <CardMedia
                    className="custom-card-media"
                    component="img"
                    height="194"
                    image={typeof course.course_img  === 'string' ? course.course_img : URL.createObjectURL(course.course_img)}
                    alt="Học Online N5"
                />
                <CardContent className="custom-card-content">
                    <Typography variant="body1" color="text.secondary">
                        Giá VND: <span>{course.price}</span>
                    </Typography>
                    <Typography paragraph>
                            Thời gian: <span>{course.duration}</span>
                        </Typography>

                    <div className="centered-button">
                        <Button style={{ fontSize: '16px', fontWeight: 700 }}>
                            Mua ngay
                        </Button>
                    </div>
                </CardContent>
            </Card>))}
        </>
    );
}