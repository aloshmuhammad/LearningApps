import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Login from '../Pages/Tutors/Login'
import LandinPage from '../Pages/Tutors/LandinPage';
import TutorsDtails from '../Pages/Tutors/TutorsDtails';
import TutorAddCourse from '../Pages/Tutors/TutorAddCourse';
import VideoListing from '../Pages/Tutors/VideoListing';
import TutorsBuyedC from '../Pages/Tutors/TutorsBuyedC';
import NotFound from '../Pages/NotFound';

const Tutor = () => {
  const Token=localStorage.getItem('Token')
  return (
    <div>
       <Routes>
            <Route path='login' element={<Login/>}/>
            <Route path='home' element={Token?<LandinPage/>:<Login/>}/>
            <Route path='details' element={Token?<TutorsDtails/>:<Login/>}/>
            <Route path='add-course' element={Token?<TutorAddCourse/>:<Login/>}/>
            <Route path='course-videos' element={Token?<VideoListing/>:<Login/>}/>
            <Route path='buyed-course' element={Token?<TutorsBuyedC/>:<Login/>}/>
            <Route path="*" element={<NotFound />} />
            
            
            
          
        </Routes>
    </div>
  )
}

export default Tutor
