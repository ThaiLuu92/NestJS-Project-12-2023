import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../../Redux/Slice/AuthSlice";
import { I_Course, I_UserPay } from "../../Types/formData.type";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDataById } from "../../Apis/API";
import { createPayment } from "../../Service/Payment.Service";
import { errorMessageCheckOut } from "../../Types/error.type";
import { AxiosError } from "axios";
import { Alert, AlertTitle } from "@mui/material";
import CheckoutService from "../../Service/Checkout.Service";

const steps = ["Điền thông tin", "Thông tin thanh toán", "Chi tiết đơn hàng"];

function getStepContent(
  step: number,
  formData: I_UserPay,
  setFormData: Function,
  japaneseCourses: I_Course
) {
  switch (step) {
    case 0:
      return <AddressForm setFormData={setFormData} formData={formData} />;
    case 1:
      return <PaymentForm setFormData={setFormData} formData={formData} />;
    case 2:
      return (
        <Review
          setFormData={setFormData}
          formData={formData}
          japaneseCourses={japaneseCourses}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

const Checkout = () => {
  const {
    japaneseCourses,
    formData,
    setFormData,
    activeStep,
    errors,
    paymentCompleted,
    handleNext,
    handleBack,
  } = CheckoutService();


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Thanh toán
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
           <React.Fragment>
           {errors  && (
             <Alert severity="error">
               <AlertTitle>Lỗi</AlertTitle>
               Thông báo lỗi — <strong>{errors}</strong>
             </Alert>
           )}
     
           {!errors  && (
             <React.Fragment>
               <Typography variant="h5" gutterBottom>
                 Cảm ơn bạn đã mua khóa học
               </Typography>
             </React.Fragment>
           )}
     
           <CssBaseline />
         </React.Fragment>
          ) : (
            <React.Fragment>
              {japaneseCourses &&
                getStepContent(
                  activeStep,
                  formData,
                  setFormData,
                  japaneseCourses
                )}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Quay lại
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Mua" : "Tiếp"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Checkout;
