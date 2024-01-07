import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { regrexRule, requireRule } from "../../utils/validate";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import Button from "../Button";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import ComponentLoading from "../ComponentLoading";
import { message } from "antd";

const rules = {
  name: [requireRule("Vui lòng nhập tên")],
  email: [
    requireRule("Vui lòng nhập email"),
    regrexRule("email", "Vui lòng nhập đúng định dạng email"),
  ],
  password: [
    requireRule("Vui lòng nhập password"),
    regrexRule("password", "Vui lòng nhập đúng định dạng password"),
  ],
  confirmPassword: [
    requireRule("Vui lòng nhập xác nhận password"),
    // regrexRule("password", "Vui lòng nhập đúng định dạng password"),
    /////Function nhận vào giá trị valuePass và ValuesForm
    (valuePass, valuesForm) => {
      /////Nếu tồn tại  và value hiện tại khác value pass thì lỗi
      if (valuesForm.password && valuePass !== valuesForm.password ) {
        return "Xác nhận password sai";
      } else
       return false;
    },
  ],
};

const RegisterForm = () => {
  const {showModal, handleShowModal, handleCloseModal,handleRegister} = useAuthContext();
  const [loading, setLoading] = useState(false); 

  const { form, error, register, validate } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    rules
  );
  const _onclickLogin = () => {
    // e.stopPropagation();
    handleShowModal("login");
  };

  const _onSubmit = (event) => {
    event.preventDefault();
    // start validate
    const errorObject = validate();

    if (Object.keys(errorObject).length > 0) {
      console.log("Submit Error", errorObject);
    } else {
      console.log("Submit success:", form);
      setLoading(true);
      handleRegister?.(form, ()=>{
        setTimeout(() => {

          setLoading(false);
         
        }, 1000);
      })

      // handleSuccess("Đăng kí thành công")
    }

    // handleLoginSubmit?.(form);
  };
  return (
    <div className="modal__wrapper-content mdregister active" style={{position:"relative"}}>
      {
        loading && <ComponentLoading/>
      }
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div className="color--primary btnmodal" data-modal="mdlogin">
          <strong onClick={_onclickLogin}>Đăng nhập</strong>
        </div>
      </div>
      {/* <div className="social">
      <a className="btn btn--google" href="#"><i><img src="img/icon-google.svg" alt="Google CFD" /></i><span>Đăng ký bằng Google</span></a>
      <a className="btn btn--facebook" href="#"><i><img src="img/icon-facebook-v2.svg" alt="Google CFD" /></i><span>Đăng ký bằng Google</span></a>
    </div>
    <span className="line">Hoặc</span> */}

      <form onSubmit={_onSubmit} action="#" className="form">
        <Input
          label=" Họ Và Tên "
          required
          // error={error.name}
          // onChange={_onChange}
          Placehoder="Họ và tên"
          {...register("name")}
        />
        <Input
          name="email"
          label=" Email "
          required
          error={error.email}
          // onChange={_onChange}
          Placehoder="Email"
          {...register("email")}
        />
        <Input
          name="password"
          label="Mật khẩu"
          required
          type="password"
          error={error.password}
          // onChange={_onChange}
          Placehoder="password"
          {...register("password")}
        />
        <Input
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          required
          type="password"
          error={error.confirmPassword}
          // onChange={_onChange}
          Placehoder="Xác nhận lại mật khẩu"
          {...register("confirmPassword")}
        />
        {/* <div className="form-group">
        <input defaultValue type="text" className="form__input formerror" placeholder="Họ và tên" />
        <p className="error">Họ và tên không được để trống</p>
      </div> */}
        {/* <div className="form-group">
        <input defaultValue type="email" className="form__input" placeholder="Email" />
      </div> */}

        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <Link
            className="color--primary"
            onClick={handleCloseModal}
            to={PATHS.PRIVACY}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className="btn btn--primary form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
