import React, { useLayoutEffect } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import UserManagement from "./Pages/UserManagement/UserManagement";
import TeachersManagement from "./Pages/TeachersManagement/TeachersManagement";
import CoursesManagement from "./Pages/CoursesManagement/CoursesManagement";
import CourseLessonManagement from "./Pages/CourseLessonManagement/CourseLessonManagement";
import OderManagement from "./Pages/OderManagement/OderManagement";
import { useSelector, useDispatch } from "react-redux";
import {
  AuthState,
  loginSuccess,
} from "../../project-admin-pages/src/Redux/Slice/appSlice";
import Login from "./Components/Login/Login";
import CatagoryManagement from "./Pages/CatagoryManagement/CatagoryManagement";
import { fetchUser } from "./services/fechLogin/fechLogin";
import QuestionManagement from "./Pages/QuestionManagement/QuestionManagement";
import AnswerManagement from "./Pages/AnswerManagement/AnswerManagement";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector(
    (state: { app: AuthState }) => state.app.user
  );
  useLayoutEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser();
      
      if (data) {
        dispatch(loginSuccess(data));
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <BrowserRouter>
        {userLogin?.role == 'admin' ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userManagement" element={<UserManagement />} />
            <Route
              path="/teachersManagement"
              element={<TeachersManagement />}
            />
            <Route
              path="/catagoryManagement"
              element={<CatagoryManagement />}
            />
            <Route path="/coursesManagement" element={<CoursesManagement />} />
            <Route
              path="/courseLessonManagement"
              element={<CourseLessonManagement />}
            />
             <Route
              path="/quesionManagement"
              element={<QuestionManagement />}
            />
              <Route
              path="/answerManagement"
              element={<AnswerManagement />}
            />
            <Route path="/oderManagement" element={<OderManagement />} />
          </Routes>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
