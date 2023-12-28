import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { I_Course, I_UserPay } from "../Types/formData.type";
import { getDataById } from "../Apis/API";
import { AuthState } from "../Redux/Slice/AuthSlice";
import React from "react";
import { createPayment } from "./Payment.Service";
import { errorMessageCheckOut } from "../Types/error.type";
import { COURSE } from "../Apis/common";

const CheckoutService = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checkOutId = searchParams.get("id");
  const [japaneseCourses, setJapaneseCourses] = useState<I_Course | null>(null);
  const [errors, setError] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      if (checkOutId) {
        const response = await getDataById(COURSE, checkOutId);        
        if (response) {
          setJapaneseCourses(response);
        }
      }
    };
    fetchCourses();
  }, [checkOutId]);

  const loggedInUser = useSelector(
    (state: { auth: AuthState }) => state.auth.user
  );

  const [formData, setFormData] = useState<I_UserPay>({
    email: "",
    user_name: "",
    phone: "",
    address: "",
    cardName: "",
    numberCard: "",
    expDate: "",
  });

  useEffect(() => {
    if (loggedInUser) {
      setFormData(loggedInUser);
    }
  }, [loggedInUser]);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === 2) {
      handleSubmit();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    const data = {
      user_id: loggedInUser.id,
      user_email: loggedInUser.email,
      courses_id: japaneseCourses?.id,
      course_price: japaneseCourses?.price,
      course_name: japaneseCourses?.name,
      category_id: japaneseCourses?.category_id,
    };
    try {
      await createPayment(data);
      setTimeout(() => {
        setPaymentCompleted(true);
        navigate("/User/MyCourse");
      }, 2000);
    } catch (error) {
      if (error) {        
        const errorMsg = error as errorMessageCheckOut;
        if (errorMsg && errorMsg.msgCheck) {
          setError(errorMsg.msgCheck);
          setTimeout(() => {
            setPaymentCompleted(true);
            navigate(`/Courses`);
          }, 2000);
        }
      }
    }
  };

  return {
    japaneseCourses,
    formData,
    setFormData,
    activeStep,
    errors,
    paymentCompleted,
    handleNext,
    handleBack,
  };
};

export default CheckoutService;
