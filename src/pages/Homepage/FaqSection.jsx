import React, { useEffect } from "react";
import Accordion from "../../components/Accordion";

const FaqSection = ({questions = [], loading= false }) => {

// useEffect(() => {
//   function accordion() {
//     $(document).on('click', '.accordion .accordion__content-title', function () {
//         $(this).next().stop().slideToggle(200);
//         $(this).closest('.accordion__content').toggleClass('active');
//         $(this).closest('.accordion__content').siblings('.active').removeClass('active').find('.accordion__content-text').stop().slideUp(200);
//     });
// }
// accordion();
// }, [])




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
            <h2 className="heading__title title --t2">
              Câu hỏi <span className="color--primary">thường gặp</span>
            </h2>
          </div>
          <div className="faq__list">
            <Accordion data = {commonQuestions} label={"Thông tin chung"} {...commonQuestions} />
            <Accordion data = {otherQuestions} label={"Đăng ký, thanh toán"} />
            {/* <div className="accordion">
              <h3 className="accordion__title label">Đăng ký, thanh toán</h3>
              <div className="accordion__content">
                <div className="accordion__content-title">
                  <h4>
                    <strong>
                      Đăng ký khóa học tại CFD Circle như thế nào?
                    </strong>
                  </h4>
                </div>
                <div className="accordion__content-text">
                  Bạn đăng ký tài khoản, chọn khóa học muốn học, điền đầy đủ
                  thông tin và bấm đăng ký học.
                  <br />
                  <br />
                  Đối với khoá học Offline: Bạn có thể thanh toán bằng chuyển
                  khoản ngân hàng, ví điện tử Momo hoặc đóng tiền mặt tại văn
                  phòng CFD Circle. Đội ngũ CFD Circle sẽ gửi email cho bạn để
                  xác nhận khi bạn đăng ký khoá học thành công.
                  <br />
                  <br />
                  Đối với khoá học Online hoặc Video: Bạn có thể thanh toán bằng
                  chuyển khoản ngân hàng hoặc ví điện tử Momo.
                  <br />
                  <br />
                  Thông tin chuyển khoản sẽ được gửi đến email của bạn ngay khi
                  bạn đăng ký khoá học, khoá học sẽ được kích hoạt khi bạn thanh
                  toán thành công.
                </div>
              </div>
              <div className="accordion__content">
                <div className="accordion__content-title">
                  <h4>
                    <strong>Làm sao để được giảm giá khoá học?</strong>
                  </h4>
                </div>
                <div className="accordion__content-text">
                  Đối với khoá học Offline hoặc Online cùng lớp Offline:
                  <br />
                  - Giảm giá cho mỗi học viên khi học theo nhóm 2 người trở lên
                  (áp dụng trên từng khoá học cụ thể).
                  <br />
                  Đối với khoá học video:
                  <br />- Chương trình giảm giá tuỳ từng mỗi khoá học khác nhau.
                </div>
              </div>
              <div className="accordion__content">
                <div className="accordion__content-title">
                  <h4>
                    <strong>
                      Làm sao để đăng ký làm giảng viên/đối tác hoặc mentor tại
                      CFD Circle
                    </strong>
                  </h4>
                </div>
                <div className="accordion__content-text">
                  Đối với giảng viên/đối tác:
                  <br />
                  Bạn có thể đăng ký trở thành giảng viên/đối tác nội dung cho
                  CFD Circle thì vui lòng bấm{" "}
                  <a
                    href="https://cfdcircle.vn/dang-ky-giang-vien"
                    target="_blank"
                  >
                    <strong>đăng ký giảng viên</strong>
                  </a>
                  . <br />
                  <br />
                  Đối với mentor:
                  <br />
                  CFD Circle sẽ thông báo tuyển dụng mentor rộng rãi thông qua
                  website và nhóm Cộng đồng CFD Circle để các bạn có thể ứng
                  tuyển.
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
