import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../Axios/axios';
import { toast } from 'react-toastify';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Task=()=> {
    const {studId}=useParams()
  const [taskFile, setTaskFile] = useState(null);

  const handleFileChange = (event) => {
    setTaskFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!taskFile) return;

    
      const formData = new FormData();
      formData.append('taskFile', taskFile);
      formData.append('studId',studId)
      const token = localStorage.getItem('Token');
        const Token = {
          token: token
        }
      
         instance.post('/tutor/task', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token
        },
      }).then((res)=>{
        console.log(res)
        if(res?.data?.status){
            toast.success('Task Added Successfully')
        }
      }).catch((err)=>{
        console.log(err)
      })

    
     
    }
  

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Upload Task File
        </Typography>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className={StyledTextField}
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleUpload}
        >
          Upload
        </StyledButton>
      </StyledPaper>
    </StyledContainer>
  );
}

export default Task;
