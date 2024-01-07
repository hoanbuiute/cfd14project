import React from "react";
import CourseItem from "../../components/CourseItem";
import PATHS from "../../constants/paths";
import Button from "../../components/Button";
import { Empty } from "antd";


const CoursesSection = ({ courses = [], loading=false }) => {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Tất cả <span className="color--primary">khóa học</span>
          </h2>
        </div>
        <div className="courses__list">
          {
            !loading && courses?.length === 0 ?
            <Empty description = "Không thấy khoá học nào" /> :
            courses.map((course,index)=>{
              return <CourseItem  key={course.id || index}   {...course}/>
            })
          }

        </div>
        <div className="courses__btnall">
          <Button link={PATHS.COURSE.INDEX} className="course__btn " variant="grey" >
            Tất cả khoá học
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
