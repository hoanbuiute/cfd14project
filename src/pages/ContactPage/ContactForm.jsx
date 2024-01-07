import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import validate, { regrexRule, requireRule } from "../../utils/validate";
import useForm from "../../hooks/useForm";
import useMutation from "../../hooks/useMutation";



  /////Rules
  const rules = {
    name: [requireRule("Vui lòng nhập tên")],
    email: [
      requireRule("Vui lòng nhập email"),
      regrexRule("email", "Vui lòng nhập đúng định dạng email"),
    ],
    phone: [
      requireRule("Vui lòng nhập số điện thoại"),
      regrexRule("phone", "Vui lòng nhập đúng định dạng số điện thoại"),
    ],
    topic: [requireRule("Vui lòng chọn khoá học")],
    content: [requireRule("Vui lòng nhập nội dung")],
  };


const ContactForm = ({handleFormSubmit}) => {
  const { form , error, register, validate } = useForm({
    name: "",
    email: "",
    phone: "",
    topic: "",
    content: "",
  },rules);
  const _onSubmit = (event) => {
    event.preventDefault();
    // start validate
    const errorObject = validate();
    if (errorObject) {
      console.log("form", form);
    }
    handleFormSubmit?.(form);
  };

  ////Register
  // const register = (registerFied) =>{
  //   return{
  //     name: registerFied,
  //     value:form[registerFied],
  //     error:error[registerFied],
  //     onChange: (e)=>{
  //       setForm({ ...form, [registerFied]: e.target.value });
  //     }

  //   }
  // }

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>

      <Input
        // name="name"
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
        Placehoder="Họ và tên"
        {...register("email")}
      />
      <Input
        // name="phone"
        label=" Số điện thoại"
        required
        // error={error.phone}
        // onChange={_onChange}
        Placehoder="Số điện thoại"
        {...register("phone")}
      />
      {/* <div className="form-group">
      <label className="label">Số điện thoại <span>*</span></label>
      <input defaultValue type="text" className="form__input" />
    </div> */}

      <Input
        // name="topic"
        label="Chủ đề cần hỗ trợ"
        required
        // error={error.topic}
        // value={form.value}
        // onChange={_onChange}

        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJs" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
        {...register("topic")}
      />

      {/* 
      <div className="form-group">
        <label className="label">
          Chủ đề cần hỗ trợ <span>*</span>
        </label>
       

        <div className="select">
        <div className="head form__input">--</div>
        <div className="sub">
          <a href="#">Web Responsive</a>
          <a href="#">React &amp; Redux</a>
        </div>
      </div>
      </div> */}

      {/* <div className="form-group">
        <label className="label">
          Nội dung <span>*</span>
        </label>
        <textarea className="form__input" defaultValue={""} />
      </div> */}

      <Input
        // name="content"
        label="nội dung"
        required
        // error={error.content}
        // value={form.content}
        // onChange={_onChange}
        {...register("content")}
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
        {...register("content")}
      />

      <div className="btncontrol">
        <Button onClick={_onSubmit} variant="primary">
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
