import React from "react";
import Login from "../Pages/Users/Login";
import OtpSign from "../Pages/Users/OtpSign";
import Signup from "../Pages/Users/Signup";
import OtpPhoneInput from "../Pages/Users/OtpPhoneInput";
import CourseSingle from "../Pages/Users/CourseSingle";
import MyCourses from "../Pages/Users/MyCourses";
import NotFound from "../Pages/NotFound";
import Profile from "../Pages/Users/Profile";
import Search from "../Components/Search";
import Chat from "../Pages/Users/Chat";
import Mytutors from "../Pages/Users/Mytutors";
import Assignment from "../Pages/Users/Assignment";
import Success from "../Pages/Users/Success";
import instance from "../Axios/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BrowserRouter, Route, Routes } from "react-router-dom";
const User = () => {
  const Token = localStorage.getItem("userToken");
  const [status, setStatus] = useState("false");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user status from the backend and update state
    const Token = localStorage.getItem("userToken");
    const User = JSON.parse(localStorage.getItem("UserInfo"));
    if (Token) {
      instance
        .get(`/auth/check-user/${User._id}`, {
          headers: {
            Authorization: Token,
          },
        })
        .then((response) => {
          setStatus(response?.data?.status);
        })
        .catch((error) => {
          console.error("Error fetching user status:", error);
        });
    }
  }, []);
  useEffect(() => {
    if (status == true) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("UserInfo");
      navigate("/user/login");
    }
  }, [status, navigate]);
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="otp-log" element={<OtpSign />} />
        <Route path="otp-phone" element={<OtpPhoneInput />} />
        <Route path="course-single/:courseId" element={<CourseSingle />} />
        <Route path="my-courses" element={Token ? <MyCourses /> : <Login />} />
        <Route path="profile" element={Token ? <Profile /> : <Login />} />
        <Route path="search" element={Token ? <Search /> : <Login />} />
        <Route path="chat/:tutorId" element={Token ? <Chat /> : <Login />} />
        <Route path="my-tutors" element={Token ? <Mytutors /> : <Login />} />
        <Route
          path="assignment-list"
          element={Token ? <Assignment /> : <Login />}
        />
        <Route path="success" element={Token ? <Success /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default User;
