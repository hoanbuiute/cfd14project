import React, { useEffect, useRef, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/coursesSevice";
import { formatCurrency, formatDate } from "../../utils/format";
import { ROLE } from "../../constants/role";
import { useAuthContext } from "../../components/Context/AuthContext";
import { regrexRule, requireRule } from "../../utils/validate";
import useForm from "../../hooks/useForm";
import { message } from "antd";
import { orderService } from "../../services/orderService";
import PATHS from "../../constants/paths";



const CourseOrderPage = () => {
  ///B1: Chuẩn bị data để truyền vào  các component
  ///Lấy courseSlug bằng hook useParams
  const params = useParams();
  const { courseSlug } = params;
  const navigate = useNavigate();

  ////useMutation để call api từ courseSlug lấy data truyền vào infoOrder
  const {
    data: courseOrderData,
    loading: courseOrderLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);

  ///useEffet để call api khi thay đổi slug
  // console.log("courseSlug",courseSlug)
  useEffect(() => {
    ////Kiểm tra nếu có courseSlug thì excute(courseSlug )
    if (courseSlug) execute(courseSlug || "", {}); ///truyền payload và onsucccess và onfail
  }, [courseSlug]);
  // console.log("courseOrderData",courseOrderData)
 
  ///----------B2 Motidy Data----------//
    //Lấy data để truyền vào infoOrder
  const { teams, price, tags, startDate } = courseOrderData || {};
    //Data truyền vào FormOrder Payment//
    const {
      profile,
      handleGetProfileCourse,
      handleGetProfilePayment,
      courseInfo,
      paymentInfo,
    } = useAuthContext();
    console.log("courseInfo",courseInfo)

    // ----------------Data Payment--------------
  //tao state chứa payment và setPayment để biết trạng thái click radio
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };
    

  ///Motify Prop
  const modifiedProps = {
    ...courseOrderData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLE.teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
  };


  /// B3----------Xử lí Data cho formOrder---------//
    //useForm truyền vào initial value và rule
const formRef = useRef();
// console.log("formRef",formRef);
  // ----------------Sự Kiện OrderPayment--------------//
  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );
//  ------------------SỰ KIỆN _onOrder --------------
  const _onOrder = () => {
    ////Validate form 
    // formRef.current.validate()
    const form = formRef.current.form;
    console.log("form",form);
    const profilePaymentError =  formRef.current.validate();
    if (Object.keys(profilePaymentError).length > 0) {
      console.log("Submit Error", profilePaymentError);
    } else {
      if (paymentMethod) {
        //call Api
        //setup payload

        const payload = {
          name: form.name,
          phone: form.phone,
          course: courseOrderData?.id,
          type: form.type,
          paymentMethod,
        };
        ///call api

        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            navigate(PATHS.PROFILE.MY_COURSE);
            ///gửi api profile khoá học và payment 
            await handleGetProfileCourse();
            await handleGetProfilePayment();
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn phương thức thanh toán");
      }
    }
  };
    ///Some: duyệt qua mảng nếu có 1 phần tử thoả đièu kiện trả về true <-> every ngược lại
  const isAlreadyOrder = courseInfo?.some(
    (item) => item?.course?.slug === courseSlug
  );
  // console.log("isAlreadyOrder", isAlreadyOrder);

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...modifiedProps} />
          <FormOrder
            // register={register}
            courseSlug ={courseSlug}
            types={tags}
            ref={formRef}
            disabled={isAlreadyOrder}
          />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            ////SelectTedpayment để kiểm tra item nào đang được bấm
            selectedPayment={paymentMethod}
            disabled={isAlreadyOrder}
          />
          {/* addclass --processing khi bấm đăng ký */}
          <Button
            onClick={_onOrder}
            disabled={isAlreadyOrder}
            loading={orderLoading}
            style={{ width: "100%" }}
          >
            <span>{isAlreadyOrder ? "Đã Đăng Kí" : "Đăng Kí Khoá Học"}</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
