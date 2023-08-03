import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import instance from '../Axios/axios';
import Image3 from '../Images/flutter.png'
import Image4 from '../Images/React.png'
import { useNavigate } from 'react-router-dom';

import './Navba.css'
const LandingCards = () => {
  const [courses,setCourses]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    const token=localStorage.getItem('userToken')
    
   instance.get('/auth/get-Course',{headers: {
    Authorization: token
  }}).then((response)=>{
    console.log(response)
   const courses=response?.data?.allCourses
   
   setCourses(courses)
  
  }).catch((err)=>{
    console.log(err)
  })
  },[])
  
  
  return (
    <div>
        <h1 className='Text'>Top Categories</h1>
    <Grid container spacing={2}>
      <Grid item xs={12}>

        <Grid container justifyContent="center" spacing={2}>
          
           

           

          {courses.map((course)=>(
            <Grid item key={course._id}>
            <Card onClick={()=>navigate(`user/course-single/${course._id}`)} sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            
            <CardMedia
                component="img"
                height="250"
                width='250'
                image={Image3}
                alt="Image 1"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" color={'whitesmoke'} component="div">
            {course.title}
          </Typography>
          <Typography variant="body2" color={'whitesmoke'}>
          {course.Description}
          </Typography>
              </CardContent>
            
            </Card>
            
             
          
          </Grid>
            ))}
            </Grid>
          {/* <Grid item>
            <Card sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            <CardMedia
                component="img"
                height="250"
                width='250'
                image={Image4}
                alt="Image 4"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div" color={'whitesmoke'}>
            React
          </Typography>
          <Typography variant="body2"  color={'whitesmoke'}>
          Flutter is Google's portable UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
          <Card sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            <CardMedia
                component="img"
                height="250"
                width='250'
                image={Image3}
                alt="Image 1"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div" color={'whitesmoke'}>
            Node.js
          </Typography>
          <Typography variant="body2"  color={'whitesmoke'}>
          Flutter is Google's portable UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            <CardMedia
                component="img"
                height="250"
                width='250'
                image={Image3}
                alt="Image 1"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div" color={'whitesmoke'}>
            Flutter
          </Typography>
          <Typography variant="body2"  color={'whitesmoke'}>
          Flutter is Google's portable UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </Typography>
              </CardContent>
            </Card>
          </Grid> */}
        {/* </Grid> */}
      </Grid>
    </Grid> 
    </div>
  )
}

export default LandingCards
