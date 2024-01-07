import React from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/coursesSevice";
import { Empty, Skeleton } from "antd";
import CourseItem from "../../components/CourseItem";
import useDebounce from "../../hooks/useDebounce";

const CoursesPage = () => {
  const { data, loading : apiLoading } = useQuery(courseService.getCourses);
  //Sử dụng useDebounce để delay loading nếu api gửi lên trước 500ms thì đợi đến 500ms sẽ rander còn hơn 500ms thì đợi đến khi loading xong
  const loading = useDebounce(apiLoading,500)

  console.log("loading",loading)
  
  const courses = data?.data?.courses || [];
  console.log("courses",courses)



  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="courses__list">
        {!loading && courses?.length === 0 && (
            <Empty
              description="Không tìm thấy dữ liệu nào"
              style={{ margin: "0 auto" }}
            />
          )}
          {loading &&
            Array(4)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="courses__list-item"
                  style={{
                    height: "50vh",
                  }}
                >
                  <Skeleton active />
                  <br />
                  <Skeleton active />
                </div>
              ))}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}

        </div>
      </div>
    </main>
  );
};

export default CoursesPage;
