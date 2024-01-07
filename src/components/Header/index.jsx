import React, { useContext } from "react";
import HeaderHamburger from "./HeaderHamburger";
import HeaderLogo from "./HeaderLogo";
import HeaderAuthen from "./HeaderAuthen";
import { useMainContext } from "../Context/MainContext";

const Header = () => {
//  const {isShowNavbar,handleShowNavbar} =useMainContext

  return (
    <div>
      <header className="header --transparent">
        <div className="container-fluid">
          <HeaderHamburger/>
          <HeaderLogo />
          <HeaderAuthen/>

        </div>
      </header>
    </div>
  );
};

export default Header;
