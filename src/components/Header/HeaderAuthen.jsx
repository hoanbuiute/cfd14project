import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useMainContext } from "../Context/MainContext";
import tokenMethod from "../../utils/token";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

const HeaderAuthen = () => {

  // const { handleShowProfile,} = useMainContext();
  const [isShowProfile, setIsShowProfile] = useState(false)
  const { handleShowModal,handleLogout,profile} = useAuthContext();
  const {profileImage,firstName} = profile || {} ; //detrustering

  
  const handleShowProfile =(Show) =>{
    setIsShowProfile(Show);
    console.log("show",Show);
  }
  const toggleProfile = (e) => {
    e.stopPropagation();
    handleShowProfile?.(!isShowProfile);
  };

  // const toggleProfile =(e) =>{
  //   e.stopPropagation();
  //   setIsShowProfile(true)
  // }

  
  const handlCloseProfile = (even) => {
    even?.stopPropagation();
    setIsShowProfile?.(false)
  };

  useEffect(() => {
    document.addEventListener("click",()=>{
      handlCloseProfile();
    })
  
    return () => {
      document.removeEventListener("click",()=>{
        handlCloseProfile();
      })
    }
  }, [])
  

  ///Kiểm tra nếu có token thì hiện profile
  if (!!tokenMethod.get()) {
    return (
      <div className="header__logged">
        <div className="userlogged">
          <div
            className="userlogged__avatar user"
            data-dropdown="userlogged__dropdown"
            onClick={toggleProfile} 
          >
            <div className="userlogged__avatar-img user__img">
              <img src={ profileImage || "/img/cfd-share-thumbnail-facebook.png" } alt="Avatar " />
            </div>
            <i className="userlogged__avatar-icon">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
              </svg>
            </i>
          </div>
          <div
            className={`userlogged__dropdown dropdown ${
              !!isShowProfile ? "active" : ""
            } `}
          >
            <div className="userlogged__dropdown-info">
              <div className="user__img">
              <img src={ profileImage || "/img/cfd-share-thumbnail-facebook.png" } alt="Avatar " />
              </div>
              <Link to={PATHS.PROFILE.INDEX} className="user__info">
                <p className="title --t4">
                  <strong>{firstName || ""}</strong>
                </p>
                <span className="email">Thông tin tài khoản</span>
              </Link>
            </div>
            <div className="userlogged__dropdown-list">
              <Link to={PATHS.PROFILE.MY_COURSE}>Khóa học của tôi</Link>
              <Link to={PATHS.PROFILE.MY_PAYMENT}>Lịch sử thanh toán</Link>
              <Link to={PATHS.CONTACT}>Hỗ trợ</Link>
              <a  onClick={(e)=>{
                e.preventDefault();
                handleLogout?.();

              }} href="#">
                Đăng xuất{" "}
                <i>
                  <img src="img/iconlogout.svg" alt />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const registerClick = (e) => {
    e.stopPropagation();
    handleShowModal("register");
  };
  const loginClick = (e) => {
    e.stopPropagation();
    handleShowModal("login");
  };
  return (
    <>
      <div class="header__auth">
        <div
          href="javascript:void(0)"
          class="btn btn--transparent btnmodal"
          data-modal="mdlogin"
        >
          <span onClick={registerClick}>Đăng ký /&nbsp;</span>
          <span onClick={loginClick}>Đăng nhập</span>
        </div>
      </div>
    </>
  );
};

export default HeaderAuthen;
