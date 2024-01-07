import React from 'react'
const PAYMENTS = [
  {
    id: "atm",
    icon: "/img/icon-payment-method-atm.svg",
    label: "Thành toán bằng chuyển khoản",
    description: `Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
      ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển
      khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
      Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
      bạn sau khi giao dịch thành công.`,
  },
  {
    id: "momo",
    icon: "/img/icon-payment-method-mo-mo.svg",
    label: "Thanh toán bằng ví Momo",
    description: `Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
      MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản
      với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
      Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
      bạn sau khi giao dịch thành công.`,
  },
  {
    id: "cash",
    icon: "/img/icon-payment-method-cod.svg",
    label: "Thanh toán bằng tiền mặt",
    description: `Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email
      của bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai
      giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ
      Chí Minh.`,
  },
];
const PaymentOrder = ({handleChange,selectedPayment,disabled }) => {
  ///Hàm lấy value để biết input nào đang được chọn 
  const _onChange = (e) =>{
    console.log("value:",e.target?.value)
    handleChange?.(e.target?.value);
  }
  return (
    <div className="itemorder paymentorder">
    <h3 className="title --t3">Hình thức thanh toán</h3>
    <div className="boxorder">
      {
          ///Map BoxorderPay
          PAYMENTS.map((payment)=>{
            const {id,icon,label,description} = payment ;
              
            return(
              <div  className="boxorder__pay">
              <label className="radiocontainer">
                <img src={icon} alt ={id}/>
                  {label}
                <input type="radio" name="radio" disabled={disabled} value={id} onChange={_onChange} />
                <span className="checkmark" />
              </label>
              
              <div 
              //kiểm tra xem selectedPayment === id thì blocl còn không thì none
              className="boxorder__pay-tooltip" style={{display: selectedPayment === id ? "block" : "none"} }
              
              >

               {description}
              </div>
            </div>
            );

          })
      }
      {/* <div className="boxorder__pay">
        <label className="radiocontainer">
          <img src={icon} alt />
          Thành toán bằng chuyển khoản
          <input type="radio" name="radio" />
          <span className="checkmark" />
        </label>
        <div className="boxorder__pay-tooltip">
          Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản ngân hàng sẽ được gửi đến
          email của bạn, bạn vui lòng chuyển khoản với nội dung: mã khoá học, họ và tên, số điện
          thoại, CFD
          Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của bạn sau khi giao dịch thành
          công.
        </div>
      </div> */}
      {/* <div className="boxorder__pay">
        <label className="radiocontainer">
          <img src="img/icon-payment-method-mo-mo.svg" alt />
          Thanh toán bằng ví Momo
          <input type="radio" name="radio" />
          <span className="checkmark" />
        </label>
        <div className="boxorder__pay-tooltip">
          Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản MoMo sẽ được gửi đến
          email của bạn, bạn vui
          lòng chuyển khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
          Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của bạn sau khi giao dịch thành
          công.
        </div>
      </div> */}
      {/* Khoá học video và video mentor thì không có thanh toán tiền mặt */}
      {/* <div className="boxorder__pay">
        <label className="radiocontainer">
          <img src="img/icon-payment-method-cod.svg" alt />
          Thanh toán bằng tiền mặt
          <input type="radio" name="radio" />
          <span className="checkmark" />
        </label>
        <div className="boxorder__pay-tooltip">
          Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email của bạn, bạn
          vui lòng đến văn phòng CFD Circle vào ngày khai
          giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ Chí Minh.
        </div>
      </div> */}
    </div>
  </div>
  )
}

export default PaymentOrder