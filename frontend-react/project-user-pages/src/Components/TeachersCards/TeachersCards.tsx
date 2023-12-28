import React from 'react'
import { Container, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./TeachersCards.scss"

function TeachersCards() {
    const teachersData = [
        {
            name: 'Quyết',
            description: 'Thông tin chi tiết về giảng viên 1',
            imageUrl: 'https://img.freepik.com/premium-photo/teacher-man-avatar-icon-illustration-in-vector-style_131965-861.jpg',
        },
        {
            name: 'Viễn',
            description: 'Thông tin chi tiết về giảng viên 2',
            imageUrl: 'https://img.freepik.com/premium-photo/teacher-man-avatar-icon-illustration-in-vector-style_131965-961.jpg',
        },
        {
            name: 'Tuyết',
            description: 'Thông tin chi tiết về giảng viên 3',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ygDDCAOX6kE0XYqIu7UQHibwaNEYmk8qm0PxCkEPan_5MARPpGJxCn7GeJofwBksxpk&usqp=CAU',
        },
        {
            name: 'Hương',
            description: 'Thông tin chi tiết về giảng viên 4',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8r4mJ7e5Xk3sfFH_igeFKj-4z1DJQ-OavBVBSmW0-opGAsOyt6pA-Xy7yd_3WI-iatkc&usqp=CAU',
        },
    ];
  return (
      <div className="teachers-cards">
          <Typography variant="h4" component="h3" sx={{
              mb: 2, fontWeight: 700,
              textAlign: 'center',
              padding: '10px',
              borderRadius: '10px',
          }}>
              Danh sách giảng viên
          </Typography>
          <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {teachersData.map((teacher, index) => (
                  <Card key={index} sx={{ maxWidth: 345, m: 2 }}>
                      <CardHeader
                          avatar={
                              <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
                                  {teacher.name[0]}
                              </Avatar>
                          }
                          title={
                              <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                                  {teacher.name}
                              </Typography>
                          }
                      />
                      <CardMedia
                          component="img"
                          height="194"
                          image={teacher.imageUrl}
                          alt={teacher.name}
                      />
                      <CardContent>
                          <Typography variant="body2" color="text.secondary">
                              {teacher.description}
                          </Typography>
                      </CardContent>
                      <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <IconButton aria-label="expand more">
                              <ExpandMoreIcon />
                          </IconButton>
                          <IconButton style={{ color: 'pink' }}
                          >
                              <FavoriteIcon />
                          </IconButton>
                      </CardActions>

                  </Card>
              ))}
          </Container>
      </div>
  )
}

export default TeachersCards
