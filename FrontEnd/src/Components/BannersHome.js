import React from "react";
import Banner1 from "../Images/All-in-one.png";
import { Box, Container } from "@mui/material";
import "./Banners.css";

const BannersHome = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      bgcolor="black"
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
          bgcolor="white"
          borderRadius="10px"
          boxShadow={3}
        >
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              objectFit: "contain",
            }}
            src={Banner1}
          ></img>
        </Box>
      </Container>
    </Box>
  );
};

export default BannersHome;
