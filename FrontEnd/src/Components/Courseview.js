import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import instance from "../Axios/axios";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paypalpayment from "./Paypalpayment";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./Error/ErrorPage";

const Courseview = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [buy, setBuy] = useState(false);
  const [orders, setOrders] = useState([]);
  const initialOptions = {
    clientId:
      "AWqF-zCg3qhcw6qwUl0q6PCTBUjyCMNujPw3UC1t3MgiiBvvJdmXXPguMnsv6AkMS5GIbIXLIuJLVycI",
    currency: "USD",
    intent: "capture",
  };

  const handleOpenRazorpay = async (data) => {
    const options = {
      key: "rzp_test_PuWlV36hk7Gp53",
      amount: Number(data.data.amount),
      currency: data.data.currency,
      name: "Learn-X",
      order_id: data.data.id,
      handler: function (response) {
        console.log(response, "32");
        const data = response;
        data.course = course;
        const user = JSON.parse(localStorage.getItem("UserInfo"));
        console.log(user, "op");
        data.user = user._id;
        const token = localStorage.getItem("userToken");
        instance
          .post(
            "/auth/verify-payment",
            { data },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            if (res?.data?.status) {
              setBuy(true);
              setOrders(res?.data?.createOrder);
              console.log(orders, "ord");
              toast.success("Course purchased Successfully");
              navigate("/user/success");
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response) {
              setError(err.response.data.error);
            } else {
              setError("An error occurred while Making the Payment.");
            }
            if (error) {
              return <ErrorPage message={error} />;
            }
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handlePay = (price) => {
    const data = { price: price * 100 };
    const token = localStorage.getItem("userToken");
    const User = JSON.parse(localStorage.getItem("UserInfo"));
    data.course = courseId;
    data.User = User._id;

    instance
      .post("/auth/capture-order", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response?.data?.existOrder) {
          toast.error("Course already buyed");
        } else {
          handleOpenRazorpay(response?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    instance
      .get(`/auth/course/${courseId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        setCourse(response?.data?.course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            maxWidth: "90%",
            width: "600px",
            backgroundColor: "primary.main",
            "@media (min-width: 600px)": {
              width: "800px",
            },
            "@media (min-width: 900px)": {
              width: "1000px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                color="textSecondary"
                textAlign="center"
              >
                {course.Description}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="textSecondary"
              >
                Become A Pro With Learn-X Courses.
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                color="textSecondary"
              >
                Language: English
              </Typography>
              <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom color="textSecondary">
                  Price: {course.price}
                </Typography>
              </Box>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                color={isLiked ? "secondary" : "default"}
                onClick={handleLike}
              >
                <FavoriteIcon />
              </IconButton>
            </Box>
            {/* <Paypalpayment orderDetails={course} /> */}

            <Button
              onClick={() => handlePay(course.price)}
              variant="contained"
              color="secondary"
              sx={{ marginTop: "20px" }}
            >
              Pay
              {/* </Button>:<Button onClick={()=>handlePay(course.price)} variant="contained" color="secondary" sx={{ marginTop: '20px' }}>
              View */}
            </Button>
          </Box>
        </Card>
      </Box>
    </PayPalScriptProvider>
  );
};

export default Courseview;
