import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogdetailPage from "./pages/BlogdetailPage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import CourseOrderPage from "./pages/CourseOrderPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentProfilePage from "./pages/StudentProfilePage";
import MyInfo from "./pages/StudentProfilePage/MyInfo";
import MyCourse from "./pages/StudentProfilePage/MyCourse";
import MyPayment from "./pages/StudentProfilePage/MyPayment";
import PATHS from "./constants/paths";
import PrivateRoute from "./components/PrivateRoute";

/////Parennt component
function App() {
  return (
    ////Children Component
    <BrowserRouter>
      {/* //PropChildren Page */}
      {/* <Homepage /> */}
      {/* <BlogPage/> */}
      {/* <BlogdetailPage/> */}
      {/* <PrivacyPage/> */}
      {/* <AboutPage/> */}
      {/* <CoursesPage/> */}
      {/* <CourseOrderPage/> */}
      {/* <CourseDetailPage/> */}
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path={PATHS.COURSE.INDEX} element={<CoursesPage />}></Route>
          <Route path={PATHS.COURSE.DETAIL} element={<CourseDetailPage />} />

          <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
          <Route path={PATHS.BLOG.DETAIL} element={<BlogdetailPage />} />

          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
            <Route path={PATHS.PROFILE.INDEX} element={<StudentProfilePage />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
              <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>

          {/* 
<Route path="payment-method" element={<PaymentMethodPage />} /> */}
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />
        </Route>
        {/* <Route path="*" element={<Page404 />} /> */}
      </Routes>

      <ContactPage />
    </BrowserRouter>
  );
}

export default App;
