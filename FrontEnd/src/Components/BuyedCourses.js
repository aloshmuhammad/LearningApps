import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import instance from '../Axios/axios';
import VideoPlayer from './VideoPlayer'; // Assuming you have a VideoPlayer component

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
}));

const BuyedCourses = () => {
  const [mycourse, setMycourse] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const User = JSON.parse(localStorage.getItem('UserInfo'));
    instance
      .get(`/auth/my-courses/${User._id}`,{headers: {
        Authorization: token
      }})
      .then((res) => {
        console.log(res);
        setMycourse(res?.data?.myCourse?.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {mycourse.map((course) => (
          <Grid key={course._id} item xs={12} sm={6} md={4}>
            <StyledPaper>
              <Title variant="h6">{course.title}</Title>
              <Typography variant="body1">{course.Description}</Typography>
              <Typography variant="body1">Price: ${course.price}</Typography>
              {/* Assuming each course has a video */}
              {course.courseVideo && course.courseVideo.length > 0 && (
                <VideoPlayer videoUrl={course.courseVideo[0]} />
              )}
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BuyedCourses;
