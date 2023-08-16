import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSuccessContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
}));

const StyledSuccessText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontSize: "1.5rem",
  textAlign: "center",
  color: "whitesmoke",
}));

const StyledRedirectButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("UserInfo"));
    const delay = 3000; // 3 seconds
    const timer = setTimeout(() => {
      navigate("/user/my-courses"); // Replace with your actual course page URL
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledSuccessContainer>
      <StyledSuccessText variant="h2">Payment Successful!</StyledSuccessText>
      <StyledRedirectButton
        variant="contained"
        color="primary"
        onClick={() => navigate("/user/my-courses")} // Replace with your actual course page URL
      >
        Continue to Course
      </StyledRedirectButton>
    </StyledSuccessContainer>
  );
};

export default PaymentSuccess;
