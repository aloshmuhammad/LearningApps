import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import instance from "../Axios/axios";

import { auth } from "../FirebaseAuth/config";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./Error/ErrorPage";

const theme = createTheme();

const OtpPhone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [erro, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleNext = () => {
    if (!phoneNumber) {
      setError("Please enter a phone number");
      return;
    }

    const phoneNumberWithCountryCode = `+91${phoneNumber}`; // Replace '91' with the appropriate country code
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

    instance
      .post("/auth/phone-no", { phoneNumber })
      .then((response) => {
        console.log(response);
        if (response?.data?.validPhone?.validNo?._id) {
          const user = response?.data?.validPhone?.validNo;
          const userToken = response?.data?.validPhone?.token;
          localStorage.setItem("UserInfo", JSON.stringify(user));
          localStorage.setItem("userToken", userToken);
          signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              navigate(`/user/otp-log?phoneNumber=${phoneNumber}`, {
                confirmationResult,
              });
            })
            .catch((err) => {
              if (err.response) {
                setErr(err.response.data.error);
              } else {
                setErr("An error occurred while Blocking The Tutor.");
              }
              if (erro) {
                return <ErrorPage message={erro} />;
              }

              // Handle OTP sending failure here
            });
        } else {
          setError("The Phone number you entered is not found");
        }
      })
      .catch((error) => {
        console.log(error);
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
        <div id="recaptcha-container">{/* Captcha container */}</div>
        <Grid item xs={12} md={6} lg={4} textAlign="center">
          <h1>Enter Phone Number</h1>
          <TextField
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={handleChange}
            fullWidth
          />
          {error && <p>{error}</p>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ mt: 2 }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default OtpPhone;
