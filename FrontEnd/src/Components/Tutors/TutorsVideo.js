import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import VideoPlayer from 'react-player';
import './TutorsVideo.css';
import instance from '../../Axios/axios';
import { ResponsiveAppBar } from '../Appbar';

const TutorsVideo = () => {
  const videoRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('Token');
      const Token = {
        token: token,
      };

      const response = await instance.post('/tutor/get-course', Token, {
        headers: {
          Authorization: token,
        },
      });

      const courses = response?.data?.Course;
      const videos = response?.data?.Course?.courseVideo;
      setCourses(courses);
      setVideos(videos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

    <ResponsiveAppBar />
    <Box p={3} sx={{ backgroundColor: 'white' }}>
     
      <Typography variant="h4" gutterBottom>
        Golang Lessons
      </Typography>
     
        
          
      <Grid container spacing={2} sx={{ backgroundColor: 'white' }}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                className="video-player-wrapper"
                component={VideoPlayer}
                ref={videoRef}
                url={video}
                controls={true}
                autoPlay={false}
                width="100%"
                height="auto"
              />
            </Card>
            <Typography variant="subtitle1">{video}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default TutorsVideo;
