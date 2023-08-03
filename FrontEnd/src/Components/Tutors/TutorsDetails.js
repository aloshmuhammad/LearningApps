// import {React,useState,useEffect} from 'react';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';

// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import {useFormik,Form } from 'formik';

// import './Signup.css';
// import instance from '../Axios/axios';
// import {useNavigate} from 'react-router-dom'
// import {setStudent,setToken} from '../Redux/Reducers/userAuthslice'
// import {useDispatch,useSelector} from 'react-redux'
// import Radio from '@mui/joy/Radio'
// import RadioGroup from '@mui/joy/RadioGroup';

// import { Link } from 'react-router-dom';


// const TutorsDetails = () => {
 
//     const {values,errors,isSubmitting, handleChange,handleBlur,handleSubmit }=useFormik({
//     initialValues:{
//         firstName:'',
//         lastName:'',
//         phoneNo:'',
//         course:'',

//     },
//     validationSchema:



//      })
//    return (
//     <>
//       <h1 className='Text'>Welcome To Learn-X</h1>

//       <Grid container spacing={2} className='container'>
//         <Grid item xs={12} sm={6}>
//           <img src={Image1} alt='Image' className='login-image' />
//         </Grid>
//         <Grid item xs={12} sm={6} className='GridLog' sx={{width:'500px'}}>
//           <Paper elevation={2} className='login-paper'>
          
//               <form onSubmit={handleSubmit} >
//                 <Grid container spacing={2} direction='column'>
//                   <Grid item className='grid-Text' >
//                     <TextField
                     
//                       className='TextN'
//                       label='First Name'
//                       name='firstName'
//                       variant='outlined'
//                       type='text'
//                       value={values.firstName}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {/* {errors.firstName ?<p style={{color:'red'}}>{errors.firstName}</p>:<p></p>} */}
                
//                   </Grid>
//                   <Grid item className='grid-Text'>
//                     <TextField
                     
//                       className='TextN'
//                       label='Last Name'
//                       name='lastName'
//                       variant='outlined'
//                       type='text'
//                       value={values.lastName}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                       {errors.lastName ?<p style={{color:'red'}}>{errors.lastName}</p>:<p></p>}
                   
//                   </Grid>
//                   <Grid item className='grid-Text'>
//                     <TextField
                    
//                       className='TextN'
//                       label='Phone No'
//                       name='phoneNo'
//                       variant='outlined'
//                       type='text'
//                       value={values.phoneNo}
//                       onChange={handleChange}
//                       onBlur={handleBlur}

//                     />
//                      {errors.phoneNo ?<p style={{color:'red'}}>{errors.phoneNo}</p>:<p></p>}
                   
//                   </Grid>
//                   <Grid item className='grid-Text'>

//                    <RadioGroup defaultValue="medium" name="radio-buttons-group">
//                    <Radio value="primary" label="Primary" color="primary" />
//                    <Radio value="neutral" label="Neutral" color="neutral" />
//                    <Radio value="danger" label="Danger" color="danger" />
//                    <Radio value="info" label="Info" color="info" />
//                    <Radio value="success" label="Success" color="success" />
//                    <Radio value="warning" label="Warning" color="warning" />
//               </RadioGroup>
//                      <TextField
                     
//                       className='TextN'
//                       label='Course'
//                       variant='outlined'
//                       name='course'
//                       type='text'
//                       value={values.course}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                      {errors.course ?<p style={{color:'red'}}>{errors.course}</p>:<p></p>} 
                   
//                   </Grid> 
                
                 
                
//                   <Grid item>
//                     <Button  type='submit' variant='contained' className='Btn' fullWidth>
//                       Set Profile
//                     </Button>
//                   </Grid>
//                   {/* { <p style={{color:'red'}}>{error}</p>
//                    } */}
                 
                 
//                 </Grid>
               
//               </form>
           
//           </Paper>
//         </Grid>
//       </Grid>
//     </>
//   );
//    }

// export default TutorsDetails
