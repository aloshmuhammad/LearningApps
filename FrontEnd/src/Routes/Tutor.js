import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Tutors/Login";
import LandinPage from "../Pages/Tutors/LandinPage";
import TutorsDtails from "../Pages/Tutors/TutorsDtails";
import TutorAddCourse from "../Pages/Tutors/TutorAddCourse";
import VideoListing from "../Pages/Tutors/VideoListing";
import TutorsBuyedC from "../Pages/Tutors/TutorsBuyedC";
import NotFound from "../Pages/NotFound";
import Profile from "../Pages/Tutors/Profile";
import TutorChat from "../Components/Tutors/TutorChat";
import Tasks from "../Pages/Tutors/Tasks";
import Submit from "../Pages/Tutors/Submit";
const Tutor = () => {
  const Token = localStorage.getItem("Token");
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={Token ? <LandinPage /> : <Login />} />
        <Route path="details" element={Token ? <TutorsDtails /> : <Login />} />
        <Route
          path="add-course"
          element={Token ? <TutorAddCourse /> : <Login />}
        />
        <Route
          path="course-videos"
          element={Token ? <VideoListing /> : <Login />}
        />
        <Route
          path="buyed-course"
          element={Token ? <TutorsBuyedC /> : <Login />}
        />
        <Route path="profile" element={Token ? <Profile /> : <Login />} />
        <Route
          path="tutor-chat/:studId"
          element={Token ? <TutorChat /> : <Login />}
        />
        <Route
          path="give-tasks/:studId"
          element={Token ? <Tasks /> : <Login />}
        />
        <Route
          path="assignment-submit"
          element={Token ? <Submit /> : <Login />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Tutor;
