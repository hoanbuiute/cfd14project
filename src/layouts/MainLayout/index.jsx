import React, { useState } from "react";
import PageLoading from "../../components/PageLoanding";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthModal from "../../components/AuthModal";
import Header from "../../components/Header";
import Overplay from "../../components/Overplay";
import { Outlet } from "react-router-dom";
import MainContextProvider from "../../components/Context/MainContext";
import AuthContextProvider from "../../components/Context/AuthContext";


const MainLayout = () => {
    // const [isShowNavbar, setIsShowNavbar] = useState(false);

    // const handleShowNavbar = (isShow) => {
    //   setIsShowNavbar(isShow);
    // };
  return (
    <MainContextProvider>
      <AuthContextProvider >
    <>
    {/* <PageLoading /> */}
      <Header />
      {/* Navbar */}
      <Navbar />
      {/* Overlay */}
      <Overplay  />
      {/* Main */}
      <Outlet/>
      {/* Main */}
      {/* Footer */}
      <Footer />
      {/* Modal Đăng Nhập / Đăng Ký */}
      <AuthModal />
    </>
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
