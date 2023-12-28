import React, { useLayoutEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Courses from "./Pages/Courses/Courses";
import CoursesDetail from "./Pages/Course-Detail/CoursesDetail";
import UserProfile from "./Pages/User/UserProfile";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import User from "./Pages/User";
import MyCourse from "./Pages/User/MyCourse";
import MyPayment from "./Pages/User/MyPayment";
import Checkout from "./Components/CheckOut/Checkout";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./Redux/Slice/AuthSlice";
import ConfirmEmail from "./Pages/Auth/ConfirmEmail/ConfirmEmail";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import ChangePassword from "./Pages/User/ChangePassword";
import { fetchData } from "./hooks/fetchUser";
import LessonsUser from "./Pages/Lessons-User/Lessons-User";
function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    fetchData()
      .then((data) => {
        dispatch(loginSuccess(data));
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ConfirmEmail" element={<ConfirmEmail />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/CheckOut" element={<Checkout />} />
        <Route path="/course/:id" element={<CoursesDetail />} />
        <Route path="/User" element={<User />}>
          <Route index element={<UserProfile />} />
          <Route path="MyCourse" element={<MyCourse />} />
          <Route path="MyPayment" element={<MyPayment />} />
          <Route path="ChangePassword" element={<ChangePassword />} />
        </Route>
        <Route path="/User/MyCourse/:id" element={<LessonsUser />} />
        <Route path="/User/MyCourse/:id/:lessonIndex" element={<LessonsUser />} />
        <Route path="/*" element={<NotFound />} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;
