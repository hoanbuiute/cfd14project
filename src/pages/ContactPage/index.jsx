import React from "react";
import ContactTitle from "./ContactTitle";
import ContactSlidebar from "./ContactSlidebar";
import ContactForm from "./ContactForm";
import useMutation from "../../hooks/useMutation";
import { subscribeService } from "../../services/subscribeService";
import { Navigate, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";

const ContactPage = () => {
  const navigate = useNavigate();
///// UseMutation
  const { execute, data, error, loading } = useMutation(
    subscribeService.postSubscribe
  );

  ////handleSubmit
  const  handleFormSubmit = async (formData)=>{
    console.log("formData",formData);
    const payload = {
      name: formData?.name || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      title: formData?.topic || "",
      description: formData?.content || "",
    };
    execute?.(payload, {
      onSuccess: ()=>{
          setTimeout(()=>{
            navigate(PATHS.HOME)
            
          },2000);
      },
      onFail: (error) => {
        console.log("error", error);
      },
    });
    // console.log("formData", formData);
    //call API
  }

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSlidebar />
            <ContactForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
