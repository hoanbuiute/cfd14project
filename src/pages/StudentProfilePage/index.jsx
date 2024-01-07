import React from "react";
import MyInfo from "./MyInfo";
import MyCourse from "./MyCourse";
import MyPayment from "./Mypayment";
import { Link, NavLink, Outlet } from "react-router-dom";
import PATHS from "../../constants/paths";
import { useAuthContext } from "../../components/Context/AuthContext";

const StudentProfilePage = () => {
  const { profile } = useAuthContext();
  console.log("profile", profile);
  const {
    profileImage,
    firstName,
    email,
    phone,
    facebookURL,
    website,
    introduce,
  } = profile || {}; //detrustering
  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar__info">
              <div className="useravatar">
                <div className="avatar">
                  <div className="img">
                    <img
                      src={
                        profileImage || "/img/cfd-share-thumbnail-facebook.png"
                      }
                      alt="Avatar "
                    />
                  </div>
                </div>
                <h3 className="title --t3">{firstName || ""}</h3>
              </div>
            </div>
            <div className="sidebar__content">
              <h4>Giới thiệu</h4>
              <p className="description">{introduce || ""}</p>
              <ul>
                <li>
                  <img src="/img/icon-mail-outline.svg" alt="icon" />
                  <span>{email || ""}</span>
                </li>
                <li>
                  <img src="/img/icon-phone-outline.svg" alt="icon" />
                  <span>{phone || ""}</span>
                </li>
                <li>
                  <img src="/img/icon-link.svg" alt="icon" />
                  <a href="#" target="_blank">
                    {facebookURL || website || ""}
                  </a>
                </li>
              </ul>
              <div className="social">
                <a href="#">
                  <img src="img/icon-facebook-dark.svg" alt />
                </a>
                <a href="#">
                  <img src="img/icon-linkedin-dark.svg" alt />
                </a>
                <a href="#">
                  <img src="img/icon-youtube-dark.svg" alt />
                </a>
              </div>
            </div>
          </div>
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink end to={PATHS.PROFILE.INDEX}>
                  Thông tin cá nhân
                </NavLink>
                <NavLink to={PATHS.PROFILE.MY_COURSE}>Khóa học của tôi</NavLink>
                <NavLink to={PATHS.PROFILE.MY_PAYMENT}>
                  Lịch sử thanh toán
                </NavLink>
              </div>
              <div className="tab__content">
                <Outlet />
                {/* Thông tin cá nhân */}
                {/* <MyInfo/> */}
                {/* Khoá học của tôi */}
                {/* <MyCourse/> */}
                {/* Lịch sử thanh thánh */}
                {/* <MyPayment/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentProfilePage;
