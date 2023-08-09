import React from 'react'
import Login from '../Pages/Users/Login';
import OtpSign from '../Pages/Users/OtpSign';
import Signup from '../Pages/Users/Signup';
import OtpPhoneInput from '../Pages/Users/OtpPhoneInput';
import CourseSingle from '../Pages/Users/CourseSingle';
import MyCourses from '../Pages/Users/MyCourses';
import NotFound from '../Pages/NotFound';
import Profile from '../Pages/Users/Profile';
import Search from '../Components/Search';

import { BrowserRouter, Route,Routes } from 'react-router-dom';
const User = () => {
  const Token=localStorage.getItem('userToken')
  return (
    <div>
    
        <Routes>
            <Route path='login' element={<Login/>}/>
            <Route path='signup' element={<Signup/>}/>
            <Route path='otp-log' element ={<OtpSign/>}/>
            <Route path='otp-phone' element={<OtpPhoneInput/>}/>
            <Route path='course-single/:courseId' element={<CourseSingle/>}/>
            <Route path='my-courses' element={Token?<MyCourses/>:<Login/>}/>
            <Route path='profile' element={Token?<Profile/>:<Login/>}/>
            <Route path='search'  eement={Token?<Search/>:<Login/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
        
       
    </div>
  )
}

export default User
