import React, { useEffect, useImperativeHandle, useRef } from "react";
import { useAuthContext } from "../../components/Context/AuthContext";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { forwardRef } from "react";
import { regrexRule, requireRule } from "../../utils/validate";
import useForm from "../../hooks/useForm";

const FormOrder = ({ types, disabled,courseSlug }, ref) => {

  //////XỬ LÍ FORM/////////
  const { profile,paymentInfo } = useAuthContext();
  ///Destructering profile lấy từ authContext
//   console.log("paymentInfo",paymentInfo)
//   const typeCourse = paymentInfo.find((item)=>
//        item.type
//   )
console.log("profile",profile)



  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
    // type: profileType,
  } = profile || {};


  const { form, validate, setForm, register } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    {
      name: [requireRule("Vui lòng nhập tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requireRule("Vui lòng nhập phone"),
        regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      type: [requireRule("Vui lòng chọn hình thức học")],
    }
  );
  // console.log("paymentInfo",paymentInfo)
  // console.log("disabled",disabled)

  const isAlreadyForm = paymentInfo.find( (item) => item?.course?.slug === courseSlug
    )
    // const profileType = isAlreadyForm.type
console.log("isAlreadyForm",isAlreadyForm)
  useEffect(() => {


    if(disabled){
      setForm({
        name: profileName,
        email: profileEmail,
        phone: profilePhone,
        type:isAlreadyForm.type,
      });
    }


  }, [profileName, profileEmail, profilePhone]);

  // const formRef = useRef();
  useImperativeHandle(
    ref,
    () => {
      return {
        form: form,
        validate: validate,
      };
    },
    [form]
  );
  // const { profile } = useAuthContext();
  // const { firstName, profileImage, email } = profile || {};
  // console.log("profile", profile);
  const typeOptions =
    types?.length > 0 //nếu types > 0 thì
      ? [
          { value: "", label: "--" },
          ...types.map((type) => ({ value: type, label: type })),
        ]
      : [{ value: "", label: "--" }];
  return (
    <div className="itemorder formorder">
      <h3 className="title --t3">Thông tin cá nhân</h3>
      <div className="boxorder">
        <div className="form">
          <div className="form-container">
            <Input
              label="Họ và tên"
              required
              placeholder="Họ và tên"
              disabled={disabled}
              {...register("name")}
            />
            <Input
              label="Email"
              required
              placeholder="Email"
              // disabled
              {...register("email")}
            />
          </div>
          <div className="form-container">
            <Input
              label="Số điện thoại"
              required
              disabled={disabled}
              placeholder="Số điện thoại"
              {...register("phone")}
            />
            <Input
              label="Hình thức học"
              required
              disabled={disabled}
              renderInput={(inputProps) => {
                return (
                  <Select
                    disabled={disabled}
                    options={typeOptions}
                    {...inputProps}
                  />
                );
              }}
              {...register("type")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(FormOrder);
