import React, { useContext, useEffect, useState} from "react";
import { createContext } from "react";
import { useLocation } from "react-router-dom";

///
const MainContext = createContext({});
//   const [isShowNavbar, setIsShowNavbar] = useState(false);

const MainContextProvider = ({ children }) => {
  const [isShowProfile, setIsShowProfile] = useState(false)
    const [isShowNavbar,setIsShowNavbar] = useState(false);
    const  {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setIsShowNavbar(false);
      
    }, [pathname])


    
///Cờ với biến ishow
    const handleShowNavbar = (isShow) => {
      setIsShowNavbar(isShow);
      // console.log("isShow",isShow);
    };
    // console.log("isShow",isShow);

  return (
    <MainContext.Provider value={{isShowNavbar,handleShowNavbar}}>
    {children}
  </MainContext.Provider>
  );
};

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);
