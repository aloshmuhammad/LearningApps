import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Adminlogin from '../Pages/Admin/Adminlogin';
import Adminlanding from '../Pages/Admin/Adminlanding';
import AdminUsermanage from '../Pages/Admin/AdminUsermanage';
import AdminTutorManage from '../Pages/Admin/AdminTutorManage';
import CourseManagePage from '../Pages/Admin/CourseManagePage';
import AdminAppliedTutors from '../Pages/Admin/AdminAppliedTutors';
import AdminAddcourse from '../Pages/Admin/AdminAddcourse';
import AdminOrders from '../Pages/Admin/AdminOrders';
import NotFound from '../Pages/NotFound';

const Admin = () => {
  const Token=localStorage.getItem('Token')
  return (
    <div>
       <Routes>
            <Route path='login' element={<Adminlogin/>}/>
            <Route path='dashboard' element ={Token?<Adminlanding/>:<Adminlogin/>}/>
            <Route path='users-list' element = {Token?<AdminUsermanage/>:<Adminlogin/>}/>
            <Route path='tutors-list' element={Token?<AdminTutorManage/>:<Adminlogin/>}/>
            <Route path='course-manage' element={Token?<CourseManagePage/>:<Adminlogin/>}/>
            <Route path='applied-tutorsManage' element={Token?<AdminAppliedTutors/>:<Adminlogin/>}/>
            <Route path='add-course' element={Token?<AdminAddcourse/>:<Adminlogin/>}/>
            <Route path='view-orders' element={Token?<AdminOrders/>:<Adminlogin/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Admin
