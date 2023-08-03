import React, { Children } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import instance from '../../Axios/axios';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik'; 
import courseSchema from '../Validation/CourseValidation';
import { toast } from 'react-toastify';

const AddCourse = () => {
    const {values,errors, handleChange,handleBlur,handleSubmit }=useFormik({
      initialValues:{
        title:'',
        Description:'',
        price:'',

      },
      validationSchema:courseSchema,
      onSubmit:(values)=>{
        const body={
            title:values.title,
            Description:values.Description,
            price:values.price
        }
        console.log(body,'ll')
        const token=localStorage.getItem('Token')
        instance.post('/admin/add-course',body,{headers: {
            Authorization: token
          }}).then((response)=>{
            console.log(response)
           if(response.data.status)toast.success('Course Added Sucessfully')
        }).catch((err)=>{
            console.log(err)
        })
      }
    })
  

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Course
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="courseName"
              name="title"
              label="Course Name"
              value={values.title}
              variant="outlined"
              onChange={handleChange}
            />
            {errors.title ?<p style={{color:'red'}}>{errors.title}</p>:<p></p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="courseDescription"
              name="Description"
              label="Course Description"
              variant="outlined"
              value={values.Description}
              onChange={handleChange}
              multiline
              rows={4}
            />
            {errors.Description?<p style={{color:'red'}}>{errors.Description}</p>:<p></p>}
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="coursePrice"
              name="price"
              label="Course Price"
              variant="outlined"
              onChange={handleChange}
              value={values.price}
              type="number"
            />
            {errors.price?<p style={{color:'red'}}>{errors.price}</p>:<p></p>}
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Add Course
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCourse;
