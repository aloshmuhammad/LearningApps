import {React,useState,useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Image1 from '../Images/Image1.png';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import {useFormik,Form } from 'formik';
import SignupSchema from './Validation/UserRegval';
import './Signup.css';
import instance from '../Axios/axios';
import {useNavigate} from 'react-router-dom'


import {auth,provider} from '../FirebaseAuth/config'
import {signInWithPopup} from 'firebase/auth'
import { Link } from 'react-router-dom';
import ErrorPage from './Error/ErrorPage';



const UserSignup = () => {
  const [email,setEmail]=useState('')
  

  const navigate=useNavigate('')
  const [error,setError]=useState('')
  const[erro,setErr]=useState('')
  const handleGoogleSign=()=>{
    signInWithPopup(auth,provider).then((data)=>{
    
    setEmail(data.user.email)
    localStorage.setItem('email',data.user.email)
    const gData={
      email:data.user.email,
      firstName:data.user.displayName,
      imageUrl:data.user.photoURL,
      google:true
    }
    console.log(gData,'vadata');
    instance.post('/auth/googlesignup',gData).then((response)=>{
      
      if(response?.data?.userGoogle?.status==false){
        setError('User already found')
    }
    else{
      localStorage.setItem('UserInfo',JSON.stringify( response?.data?.userGoogle?.validUser))
      localStorage.setItem('userToken',response?.data?.userGoogle?.token)
     
     
     
      
      navigate('/')
    }

  }).catch((err)=>{
    if(err.response){
      setErr(err.response.data.error)
    }
    else {
  
      setErr("An error occurred while Blocking The Tutor.");
    }
    if (erro) {
  
      return <ErrorPage message={erro} />;
    }
  })
  
    })
  
  } 
 
  const {values,errors,isSubmitting, handleChange,handleBlur,handleSubmit }=useFormik({
  
    initialValues:{
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    },
    validationSchema:SignupSchema,
    onSubmit:(values)=>{
      const body={
        firstName:values.firstName,
       lastName: values.lastName,
        phoneNo:values.phoneNo,
        email:values.email,
        password:values.password,
        confirmPassword:values.confirmPassword

    }
    instance.post('/auth/usersignup',body).then((response)=>{
      console.log(response.data)
      console.log(response.data.userToken.validUser);
      if(response?.data?.userToken?.status==false){
          setError('User already found')
      }
      else{
        localStorage.setItem('UserInfo',JSON.stringify( response?.data?.userToken?.validUser))
        localStorage.setItem('userToken',response?.data?.userToken?.token)
      
       
       
        
        navigate('/')
      }

    }).catch((err)=>{
      if(err.response){
        setErr(err.response.data.error)
      }
      else {
    
        setErr("An error occurred while Blocking The Tutor.");
      }
      if (erro) {
    
        return <ErrorPage message={erro} />;
      }
    })
     
 
  }

  })
 



  
 

  return (
    <>
      <h1 className='Text'>Welcome To Learn-X</h1>

      <Grid container spacing={2} className='container'>
        <Grid item xs={12} sm={6}>
          <img src={Image1} alt='Image' className='login-image' />
        </Grid>
        <Grid item xs={12} sm={6} className='GridLog' sx={{width:'500px'}}>
          <Paper elevation={2} className='login-paper'>
          
              <form onSubmit={handleSubmit} >
                <Grid container spacing={2} direction='column'>
                  <Grid item className='grid-Text' >
                    <TextField
                     
                      className='TextN'
                      label='First Name'
                      name='firstName'
                      variant='outlined'
                      type='text'
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName ?<p style={{color:'red'}}>{errors.firstName}</p>:<p></p>}
                
                  </Grid>
                  <Grid item className='grid-Text'>
                    <TextField
                     
                      className='TextN'
                      label='Last Name'
                      name='lastName'
                      variant='outlined'
                      type='text'
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {errors.lastName ?<p style={{color:'red'}}>{errors.lastName}</p>:<p></p>}
                   
                  </Grid>
                  <Grid item className='grid-Text'>
                    <TextField
                    
                      className='TextN'
                      label='Phone No'
                      name='phoneNo'
                      variant='outlined'
                      type='text'
                      value={values.phoneNo}
                      onChange={handleChange}
                      onBlur={handleBlur}

                    />
                     {errors.phoneNo ?<p style={{color:'red'}}>{errors.phoneNo}</p>:<p></p>}
                   
                  </Grid>
                  <Grid item className='grid-Text'>
                    <TextField
                     
                      className='TextN'
                      label='Email'
                      variant='outlined'
                      name='email'
                      type='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {errors.email ?<p style={{color:'red'}}>{errors.email}</p>:<p></p>}
                   
                  </Grid>
                  <Grid item className='grid-Text'>
                    <TextField
                  
                      className='TextN'
                      label='Password'
                      variant='outlined'
                      name='password'
                      type='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {errors.password ?<p style={{color:'red'}}>{errors.password}</p>:<p></p>}
                  
                  </Grid>
                  <Grid item className='grid-Text'>
                    <TextField
                      
                      className='TextN'
                      label='Confirm Password'
                      variant='outlined'
                      name='confirmPassword'
                      type='password'
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {errors.confirmPassword ?<p style={{color:'red'}}>{errors.confirmPassword}</p>:<p></p>}
                   
                  </Grid>
                  <Grid item>
                    <Button disabled={isSubmitting} type='submit' variant='contained' className='Btn' fullWidth>
                      Register
                    </Button>
                  </Grid>
                  <p style={{color:'red'}}>{error}</p>
                  <p>---------------------Or--------------------------</p>
                  <Button onClick={handleGoogleSign} className='btnbtn' variant='contained' sx={{ backgroundColor: 'green' }} startIcon={<GoogleIcon />}>
                    Signup With Google
                  </Button>
                  <Grid item>
                    <Link to='/user/login'>Already Have An Account?</Link>
                  </Grid> 
                </Grid>
               
              </form>
           
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default UserSignup;







