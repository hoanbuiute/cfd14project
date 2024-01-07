import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import HeroDetailSection from "./HeroDetailSection";
import ContentDetailSection from "./ContentDetailSection";
import FaqSection from "./FaqSection";
import CoursesSection from "./CoursesSection";
import FeaturedSection from "./FeaturedSection";
import HeaderTop from "./HeaderTop";
import { courseService } from "../../services/coursesSevice";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { questionsService } from "../../services/questionsService";
import { ROLE } from "../../constants/role";
import { formatCurrency, formatDate } from "../../utils/format";
import useDebounce from "../../hooks/useDebounce";
import PageLoading from "../../components/PageLoanding";

const CourseDetailPage = () => {
  const params = useParams();
  const { courseSlug } = params;
  console.log("param", params);

  ///1: Lấy chi tiết khoá học 
  const {
    data: courseDetailData,
    // error:courseDetailError,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);
  //2:lấy từng khoá học 
  const { data: questionsData, loading: questionLoading } = useQuery(
    questionsService.getQuestions
  );
  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourses
  );

  useEffect(() => {
    ////Kiểm tra nếu có courseSlug thì excute(courseSlug )
    if (courseSlug) execute(courseSlug || "", {});
  }, [courseSlug]);
  // Modify data
  

  const questions = questionsData?.data?.questions || [];
  // console.log("questions",questions)
  const courses = courseData?.data?.courses || [];
  const orderLink = `/course-order/` + courseSlug;
  // console.log("dataCourseDetail", courseDetailData); 
  const {teams,name,price,startDate} = courseDetailData || {};

  /////modifiedProps
  const modifiedProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLE.teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };
////Xử lí loading
  const apiLoading = courseDetailLoading || questionLoading || courseLoading;

  const pageLoading = useDebounce(apiLoading, 500);
  console.log("pageLoading",pageLoading)

  if (pageLoading) {
    return  <PageLoading/>;
  } 

  return (
    <>
      <HeaderTop {...modifiedProps}/>
      <main className="mainwrapper coursedetailpage">
        <HeroDetailSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection {...modifiedProps} />
        <FaqSection questions={questions} loading={questionLoading} />
        <CoursesSection courses={courses} loading={courseLoading} />
      </main>
    </>
  );
};

export default CourseDetailPage;
