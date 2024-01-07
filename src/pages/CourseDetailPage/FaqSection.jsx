import React from 'react'
import Accordion from '../../components/Accordion';

const FaqSection = ({questions = [], loading= false }) => {

  /////MAp vô từng item
const modifiedQuestions =
questions?.map((item) => {
  // const { id, question, answer } = item || {};
  return {
    id : item.id || "",
    title: item.question || "",
    content: item.answer || "",
  };
}) || [];

const commonQuestions = modifiedQuestions.slice(0, 6);  /// lấy phần tử 0-6

const otherQuestions = modifiedQuestions.slice(6); ///lấy phần từ thứ 6 trở đi
  return (
    
    <section className="faq --scpadding">
    <div className="container">
      <div className="faq__inner">
        <div className="heading --noline --center">
          <h2 className="heading__title title --t2">Câu hỏi <span className="color--primary">thường gặp</span>
          </h2>
        </div>
        <div className="faq__list">
          <Accordion  data = {commonQuestions} label={"Thông tin chung"} />
          <Accordion data = {otherQuestions} label={"Đăng ký, thanh toán"}  />
        </div>
      </div>
    </div>
  </section>
  )
}

export default FaqSection;