import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import Button from "../Button";
import { regrexRule, requireRule } from "../../utils/validate";
import ComponentLoading from "../ComponentLoading";
import { message } from "antd";

const rules = {
  email: [
    requireRule("Vui lòng nhập email"),
    regrexRule("email", "Vui lòng nhập đúng định dạng email"),
  ],
  password: [
    requireRule("Vui lòng nhập password"),
    regrexRule("password", "Vui lòng nhập đúng định dạng password"),
  ],
};

const LoginForm = () => {
  ///State Loading
  const [loading, setLoading] = useState(false);
  ///useContext
  const {
    showModal,
    handleShowModal,
    handleCloseModal,
    handleLogin,
  } = useAuthContext();
  const _onclickRegister = (e) => {
    e.stopPropagation();
    handleShowModal("register");
  };
  /////Sự kiện onsubmit
  const _onSubmit = (event) => {
    event.preventDefault();
    // start validate
    const errorObject = validate();

    if (Object.keys(errorObject).length > 0) {
      console.log("Submit Error", errorObject);
    } else {
      setLoading(true);
      console.log("Submit success:", form);
      ///Hàm handleLogin nhận vào payload và hàm callback
        handleLogin?.({ ...form }, ()=>{
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })

      



    }

    // handleLoginSubmit?.(form);
  };
  const { form, error, register, validate } = useForm(
    {
      email: "",
      password: "",
    },
    rules
  );

  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div className="color--primary btnmodal" data-modal="mdregister">
          <strong onClick={_onclickRegister}>Đăng ký</strong>
        </div>
      </div>
      {/* <div className="social">
      <a className="btn btn--google" href="#"><i><img src="img/icon-google.svg" alt="Google CFD" /></i><span>Đăng nhập bằng Google</span></a>
      <a className="btn btn--facebook" href="#"><i><img src="img/icon-facebook-v2.svg" alt="Google CFD" /></i><span>Đăng nhập bằng Google</span></a>
    </div>
    <span className="line">Hoặc</span> */}
      <form onSubmit={_onSubmit} action="#" className="form">
        <Input
          name="email"
          label=" Email "
          required
          error={error.email}
          // onChange={_onChange}
          placeholder="Email"
          {...register("email")}
        />
        <Input
          name="password"
          label="password"
          required
          type="password"
          error={error.password}
          // onChange={_onChange}
          placeholder="password"
          {...register("password")}
        />
        {/* <div className="form-group">
        <input defaultValue type="email" className="form__input formerror" placeholder="Email" />
        <p className="error">Email không được để trống</p>
      </div> */}

        {/* <div className="form-group">
        <input defaultValue type="password" className="form__input" placeholder="Mật khẩu" />
      </div> */}
        {/* <div className="form__bottom">
        <a className="color--primary" href="#">Quên mật khẩu?</a>
      </div> */}
        <Button
          // onClick={handleCloseModal}
          className="form__btn-register"
          type="submit"
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
