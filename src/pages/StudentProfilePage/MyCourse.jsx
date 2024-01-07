import React from 'react'
import { useAuthContext } from '../../components/Context/AuthContext'
import CourseItem from '../../components/CourseItem';
import { Empty } from 'antd';

const MyCourse = () => {
  
  const { profile,
    handleGetProfileCourse,
    handleGetProfilePayment,courseInfo} = useAuthContext();
    console.log("courseInfo",courseInfo);
  return (
    <div className="tab__content-item"  style={{ display: "block" }}>
    <div className="courses__list">
      {
        courseInfo.length === 0 && (
          <Empty description = "Không thấy dữ liệu " 
          style={{ margin: "0 auto" }}/>
          
        )
      }
      {
          courseInfo?.length >0 &&(
            courseInfo.map((itemCourse) =>{
              const {course,customer} =itemCourse;
              return(
              <CourseItem key={course?.id || index} {...course}/>
              )
    
            })

          )
   
      }


    </div>
  </div>
  )
}

export default MyCourse