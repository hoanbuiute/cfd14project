import axios from "axios";
import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/coursesSevice";
import { teamsService } from "../../services/teamsService";
import { questionsService } from "../../services/questionsService";
import { galleryService } from "../../services/galleryService";
import HeroSection from "./HeroSection";
import CourseComingSection from "./CourseComingSection";
import CoursesSection from "./CoursesSection";
import TeacherSection from "./TeacherSection";
import FeaturedSection from "./FeaturedSection";
import TestimonialSection from "./TestimonialSection";
import FaqSection from "./FaqSection";
import GallerySection from "./GallerySection";
import CallRegisterSection from "./CallRegisterSection";

const Homepage = () => {
  const {
    data: coursesData,
    error: coursesError,
    loading: coursesLoading,
  } = useQuery(courseService.getCourses);

  /////API Teams
  const {
    data: teamsData,
    error: teamsError,
    loading: teamsLoading,
  } = useQuery(teamsService.getTeams);

  // console.log("teamsData",teamsData)
  /////API Questions
  const {
    data: QuestionsData,
    error: QuestionsError,
    loading: QuestionsLoading,
  } = useQuery(questionsService.getQuestions);

  // console.log("QuestionsData",QuestionsData)
  // /////API Gallery
  const {
    data: galleryData,
    error: galleryError,
    loading: galleryLoading,
  } = useQuery(galleryService.getGallery);
  // console.log("galleryData", galleryData);

  // Modify data
  const courses = coursesData.data?.courses || [];

  //  console.log("courses",courses);
  const commingCourses =
    courses.filter(
      (course) => course.startDate && new Date(course.startDate) > new Date()
    ) || [];

  //  console.log("commingCourses",commingCourses);

  const teams = teamsData.data?.teams || [];
  //  console.log("teams",teams)
  const questions = QuestionsData.data?.questions || [];
  const galleries = galleryData.data?.galleries?.[0]?.images || [];
  // console.log("galleries",galleries);

  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection courses={commingCourses} loading={coursesLoading} />
      <CoursesSection courses={courses} loading={coursesLoading} />
      <TeacherSection teachers={teams} loading={teamsLoading} />
      <FeaturedSection />
      {/* --------------------------------Testimonial-------------------------------- */}
      <TestimonialSection />
      {/* --------------------------------faq-------------------------------- */}
      <FaqSection questions={questions} loading={QuestionsLoading} />
      <GallerySection galleries={galleries} loading={galleryError} />
      <CallRegisterSection />
    </main>
  );
};

export default Homepage;
