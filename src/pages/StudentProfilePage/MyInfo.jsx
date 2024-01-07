import React, { useEffect } from "react";
import { useAuthContext } from "../../components/Context/AuthContext";
import Input from "../../components/Input";
import TextArea from "antd/es/input/TextArea";
import Button from "../../components/Button";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";

const rules = {
  firstName: [requireRule("Vui lòng nhập tên")],
  email: [
    requireRule("Vui lòng nhập email"),
    regrexRule("email", "Vui lòng nhập đúng định dạng email"),
  ],
  phone: [
    requireRule("Vui lòng nhập phone"),
    regrexRule(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Vui lòng nhập đúng định dạng phone"
    ),
  ],
  facebookURL:[
    requireRule("Vui lòng nhập facebook"),
  ]

  // password: [requireRule("Vui lòng nhập mật khẩu")],
};

const MyInfo = () => {
  const { handleShowModal, handleLogout, profile, courseInfo,handleUpdateProfile } =
    useAuthContext();
  // const {course,customer} =courseInfo
  // const { profileImage, firstName, email } = profile || {};
  const { form, validate, setForm, register } = useForm(
    {
      firstName: "",
      email: "",
      phone: "",
      password: "********",
      facebookURL: "",
      website: "",
      introduce: "",
    },
    rules
  );



  // console.log("profile",profile)

  //detructering
  ///Sự kiện _onSubmit
  const _onSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    const profileUpdateError = validate();
    if(Object.keys(profileUpdateError).length > 0){
      console.log("Submit Error", profileUpdateError);
    }else{
      ///xử lí call api 
      handleUpdateProfile?.(form);
    }
  };

  console.log("profile", profile);
  useEffect(() => {
    if (profile) {
      setForm({...form, ...profile});
    }
  }, [profile]);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form">
        <div className="form-container">
          <Input
            label="Họ và tên"
            required

            placeholder="Họ và tên"
             {...register("firstName")}
          />

          <Input
            label="Số Điện Thoại "
            required
            placeholder="Số Điện Thoại"
             {...register("phone")}
          />
        </div>
        <div className="form-container">
          <Input
            label="Email "
            required
            placeholder="Email"
             {...register("email")}
             disabled
          />

          <Input
            label="Mật khẩu"
            required
            placeholder="Mật khẩu"
            {...register("password")}
            disabled
          />
          {/* <input
              defaultValue={12345568900}
              type="password"
              disabled
              className="form__input"
            /> */}
        </div>
        <Input
          label="Facebook URL"
          required
          placeholder="Facebook URL"
          {...register("facebookURL")}
        />
        <Input
          label="Website"
          // required
          placeholder="Website"
          {...register("website")}
        />
        <Input
          label="Giới thiệu bản thân"
          // required
          renderInput={(inputProps) => {
            return <TextArea {...inputProps} />;
          }}
          {...register("introduce")}
        />
        <p className="noti">Cập nhận thông tin thành công</p>
        <Button style={{ width: "100%" }} variant="primary" onClick={_onSubmit}>
          Gửi
        </Button>
      </form>
    </div>
  );
};

export default MyInfo;
