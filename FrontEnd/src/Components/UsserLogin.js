import { React, useState } from "react";
import "./login.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Image1 from "../Images/Image1.png";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import signinSchema from "./Validation/userSign";
import { useFormik, Form } from "formik";
import instance from "../Axios/axios";
import { useNavigate } from "react-router-dom";

import { auth, provider } from "../FirebaseAuth/config";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import ErrorPage from "./Error/ErrorPage";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [erro, setErr] = useState("");
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: (values) => {
      const body = {
        email: values.email,
        password: values.password,
      };
      instance
        .post("/auth/userlogin", body)
        .then((response) => {
          const { data } = response;
          if (data?.status == false) setError("This email not Exist");
          if (data?.blocked) setError("The User is Blocked!");
          if (data?.password == false)
            setError("The Password you entered is incorrect");
          if (data?.google)
            setError(
              "The user is already signup using google. Please login with google"
            );
          if (data?.user) {
            localStorage.setItem("UserInfo", JSON.stringify(data?.user));
            localStorage.setItem("userToken", data?.token);
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response) {
            setErr(err.response.data.error);
          } else {
            setErr("An error occurred while User Login.");
          }
          if (erro) {
            return <ErrorPage message={erro} />;
          }
        });
    },
  });
  const handleGoogleSign = () => {
    signInWithPopup(auth, provider).then((data) => {
      setEmail(data.user.email);
      localStorage.setItem("email", data.user.email);
      const gData = {
        email: data.user.email,
      };
      console.log(gData, "vadata");
      instance
        .post("/auth/googleSignin", gData)
        .then((response) => {
          console.log(response.data, "user");
          if (response?.data?.status == true) {
            localStorage.setItem(
              "UserInfo",
              JSON.stringify(response?.data?.user)
            );
            localStorage.setItem("userToken", response?.data?.token);
            // dispatch(setStudent(response?.data?.userGoogle?.validUser))
            // dispatch(setToken(response?.data?.userGoogle?.token))

            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response) {
            setErr(err.response.data.error);
          } else {
            setErr("An error occurred during User Google SignIn.");
          }
          if (erro) {
            return <ErrorPage message={erro} />;
          }
        });
    });
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <h1 className="Text">Welcome To Learn-X</h1>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={Image1} alt="Image" className="login-image" />
        </Grid>
        <Grid item xs={12} md={6} className="GridLog">
          <Paper elevation={2} className="login-paper">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    className="TextN"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email ? (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  ) : (
                    <p></p>
                  )}
                </Grid>
                <Grid item>
                  <TextField
                    className="TextN"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password ? (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  ) : (
                    <p></p>
                  )}
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" className="Btn">
                    Sign In
                  </Button>
                </Grid>
                <p style={{ color: "red" }}>{error}</p>

                <Grid item>
                  <p>--------------------Or--------------------------</p>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleGoogleSign}
                      className="btnbtn"
                      variant="contained"
                      sx={{ backgroundColor: "green" }}
                      startIcon={<GoogleIcon />}
                    >
                      Login With Google
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/user/signup">Don't Have An Account?</Link>
                  </Grid>
                </Grid>
                <Grid item>
                  <a href="/user/otp-phone">Login with otp?</a>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserLogin;
