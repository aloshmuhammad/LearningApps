import {React,useState} from 'react';
import './Adlogin.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Image1 from '../Images/Adlogin.jpg';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useFormik,Form } from 'formik';
import signinSchema from './Validation/userSign';
import instance from '../Axios/axios';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './Error/ErrorPage';

const AdLogin = () => {
  const [error,setError]=useState('')
  const [erro,setErr]=useState('')
  const navigate=useNavigate()

  const {values,errors,isSubmitting, handleChange,handleBlur,handleSubmit }=useFormik({
    initialValues:{
      email:'',
      password:''
    },
   validationSchema:signinSchema,
   onSubmit:(values)=>{
    const body={
      email:values.email,
      password:values.password
    }
    instance.post('auth/admin-login',body).then((response)=>{
      console.log(response,'lkkjkjhh')
      const {data}=response
      
      if(data?.status==false) setError('Invalid Email')
      if(data?.password==false)setError('Password is Incorrect')
      if(data?.token){
        localStorage.setItem('Token',data.token)
        navigate('/admin/dashboard')
      }
      
    }).catch((err)=>{
      if(err.response){
        setErr(err.response.data.error)
      }
      else {
    
        setErr("An error occurred during Admin Sign IN.");
      }
      if (erro) {
    
        return <ErrorPage message={erro} />;
      }
    })
   }

  })
  return (
    <div  sx={{backgroundColor:'cadetblue'}}>
    <Box sx={{ padding: '2rem',backgroundColor:'cadetblue' }}>
      <h1 className='Text'>Welcome Admin</h1>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={Image1} alt='Image' className='login-image' />
        </Grid>
        <Grid item xs={12} md={6} className='GridLog'>
          <Paper elevation={2} className='login-paper'>
          <form onSubmit={handleSubmit} >
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <TextField 
                className='TextN'
                 label='Email' 
                 variant='outlined'
                 name='email'
                 value={values.email}
                 onChange={handleChange}
                 
                 />
                  {errors.email?<p style={{color:'red'}}>{errors.email}</p>:<p></p>}
              </Grid>
              <Grid item>
                <TextField 
                className='TextN'
                label='Password'
                variant='outlined' 
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                 />
                  {errors.password ?<p style={{color:'red'}}>{errors.password}</p>:<p></p>}
              </Grid>
              <Grid item>
                <Button type='submit' variant='contained' className='Btn'>
                  Sign In
                </Button>
              </Grid>
              <p style={{color:'red'}}>{error}</p>
             
                
              
              <Grid item>
                <a href='#'>Forgot Password</a>
              </Grid>
            </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default AdLogin;