import { React, useState } from "react";
import "./Tutorlogin.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Image1 from "../Images/tutor.jpg";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useFormik, Form } from "formik";
import signinSchema from "./Validation/userSign";
import instance from "../Axios/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToken, setTutor } from "../Redux/Reducers/tutorSlice";
import ErrorPage from "./Error/ErrorPage";

const Tutorlogin = () => {
  const dispatch = useDispatch();
  // const Tutor=useSelector((state)=>state.tutorInfo.tutor)
  // console.log(Tutor,'oop')

  const [error, setError] = useState("");
  const [erro, setErr] = useState("");
  const navigate = useNavigate();
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      onSubmit: (values) => {
        const body = {
          email: values.email,
          password: values.password,
        };
        instance
          .post("auth/tutor-login", body)
          .then((response) => {
            const { data } = response;
            console.log(data, "kl");
            if (data?.notTutor)
              setError("The Email id you entered is not found!");
            if (data?.Blocked)
              setError("The Account is blocked by admin please contact admin");
            if (data?.status == false)
              setError("The Password you entered is Incorrect");
            if (data?.status) {
              localStorage.setItem("Token", data?.token);
              const Tutor = data?.tutor;
              dispatch(setTutor(Tutor));
              // localStorage.setItem('Tutor',JSON.stringify(data?.tutor))
              navigate("/tutor/home");
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response) {
              setErr(err.response.data.error);
            } else {
              setErr("An error occurred during Admin Sign IN.");
            }
            if (erro) {
              return <ErrorPage message={erro} />;
            }
          });
      },
    });
  return (
    <div sx={{ backgroundColor: "cadetblue" }}>
      <Box sx={{ padding: "2rem" }}>
        <h1 className="Text">Welcome To Tutors DashBoard Lets Teach!</h1>

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
                      name="email"
                      variant="outlined"
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

                  <Grid item>
                    <a href="#">Forgot Password</a>
                  </Grid>
                  <p style={{ color: "red" }}>{error}</p>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Tutorlogin;
