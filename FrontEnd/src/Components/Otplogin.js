import React, { useState, useEffect } from "react";
import { Grid, Button, ThemeProvider, createTheme } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { signInWithCredential } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "../FirebaseAuth/config";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  // Theme configuration
});

const Otplogin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [phoneNumber, setPhoneNumber] = useState();

  const [otp, setOtp] = useState("");
  const [resendOtpDisabled, setResendOtpDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();
  const [confirmationResult, setConfirmationResult] = useState(
    window.confirmationResult
  );
  console.log(confirmationResult, "oop");

  useEffect(() => {
    const phone = queryParams.get("phoneNumber");
    setPhoneNumber(phone);
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendOtpDisabled(false);
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleLogin = () => {
    confirmationResult
      .confirm(otp)
      .then((userCredential) => {
        // OTP verification successful
        console.log("OTP verification successful:", userCredential);
        // Navigate to the home page or the desired route
        navigate("/");
      })
      .catch((error) => {
        // OTP verification failed
        toast.success("Invalid OTP");
        console.log("OTP verification failed:", error);
        // Handle OTP verification failure here
      });
  };

  const handleResendOtp = () => {
    setResendOtpDisabled(true);
    setTimer(60); // Reset the timer to the initial value

    // Add your logic to resend the OTP here
    const phoneNumberWithCountryCode = `+91${phoneNumber}`; // Replace with the appropriate country code
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask the user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );

    signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        toast.success("OTP has been resent");
      })
      .catch((error) => {
        console.log("OTP Resending Failed", error);
        // Handle OTP resending failure here
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", backgroundColor: "whitesmoke" }}
      >
        <Grid item xs={12} textAlign="center">
          <h1>OTP Login</h1>
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={6} textAlign="center">
          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            length={6}
            separator={<span>-</span>}
            inputStyle={{ fontSize: "24px", padding: "10px" }}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Grid>
        <div id="recaptcha-container"></div>
        <Grid item xs={12} textAlign="center">
          <p>Resend OTP in: {timer} seconds</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleResendOtp}
            disabled={resendOtpDisabled}
          >
            Resend OTP
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Otplogin;
