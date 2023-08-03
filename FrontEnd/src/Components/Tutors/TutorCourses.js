import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import instance from '../../Axios/axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TutorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    if (localStorage.getItem('Token')) {
      const token = localStorage.getItem('Token');
      const Token = {
        token: token
      };
     
     

      instance
        .post('/tutor/get-course', Token, {headers: {
            Authorization: token
          }})
        .then((response) => {
          const courses = response?.data?.Course;
          setCourses(courses);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAddVideo = (courseId) => {
   
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'video/*';
    fileInput.onchange = (e) => handleVideoUpload(e.target.files[0], courseId);
    fileInput.click();
  };

  const handleVideoUpload = (file, courseId) => {
    setIsUploading(true);
    console.log(courseId,'jj')
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', courseId);
  
        const token = localStorage.getItem('Token');
        const Token = {
          token: token
        }
  

    instance
      .post('/tutor/add-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token

        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progressPercent = Math.round((loaded / total) * 100);
          console.log(`Upload progress: ${progressPercent}%`);
        }
      })
      .then((response) => {
        
        setIsUploading(false);
        if(response?.status===200){
            toast.success('Video Uploaded Successfully')
        }
      })
      .catch((error) => {
        console.log(error);
        setIsUploading(false);
      });
  };

  return (
    <Box
      sx={{
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: 'whitesmoke',
        borderRadius: '8px',
        marginTop: '74px'
      }}
    >
      <Typography variant="h6" gutterBottom>
        My Courses
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              <TableRow >
                <TableCell>{courses.title}</TableCell>
                <TableCell>{courses.Description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddVideo(courses._id)}
                  >
                    Add Video
                  </Button>
                </TableCell>
              </TableRow>
        
          </TableBody>
        </Table>
      </TableContainer>

      {isUploading && (
        <Box display="flex" justifyContent="center" alignItems="center" marginTop="16px">
          <CircularProgress />
          <Typography variant="body1" marginLeft="8px">
            Uploading video...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TutorCourses;
