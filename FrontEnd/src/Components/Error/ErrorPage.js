import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ErrorPage = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ color: "#e74c3c", mb: 3 }}>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" sx={{ color: "#444", mb: 4 }}>
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
      >
        Retry
      </Button>
    </Box>
  );
};

export default ErrorPage;
