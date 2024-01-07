import React from "react";
import { useAuthContext } from "../../components/Context/AuthContext";
import { formatCurrency, formatDate } from "../../utils/format";
import { Empty } from "antd";
import { PAYMENT_METHOD_LABEL } from "../../constants/general";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();
  // const {course,customer} = paymentInfo || {};
  // console.log("paymentInfo",paymentInfo)
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {paymentInfo.length === 0 && (
        <Empty description="Không thấy dữ liệu thanh toán" />
      )}
      {paymentInfo.map((payment) => {
        const { course, customer,paymentMethod,updatedAt } = payment || {};
        const paymentMethodName = PAYMENT_METHOD_LABEL[paymentMethod];

        return (
          <div className="itemhistory">
            <div className="name">{course?.name || ""}</div>
            <div className="payment">{paymentMethodName}</div>
            <div className="date">{formatDate(updatedAt)}</div>
            <div className="money">{formatCurrency(course.price)}VNĐ</div>
          </div>
        );
      })}
      {/* <div className="itemhistory">
      <div className="name">Frontend Newbie</div>
      <div className="payment">Chuyển khoản</div>
      <div className="date">05/01/2022</div>
      <div className="money">4.500.000 VND</div>
    </div>
    <div className="itemhistory">
      <div className="name">Web Responsive</div>
      <div className="payment">Tiền mặt</div>
      <div className="date">14/07/2022</div>
      <div className="money">4.900.000 VND</div>
    </div> */}
    </div>
  );
};

export default MyPayment;
