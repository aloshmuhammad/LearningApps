import { React, useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import instance from "../../Axios/axios";
import { useSelector } from "react-redux";
import "./UsersList.css";
import ErrorPage from "../Error/ErrorPage";
import { Link } from "react-router-dom";
import "./UsersList.css";

const BuyedCourseList = () => {
  let Tutor = useSelector((state) => state.tutorInfo.tutor);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const theme = useTheme();

  const columns = [
    {
      name: "firstName",
      label: "UserName",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "_id",
      label: "Message",
      options: {
        customBodyRender: (value, tableMeta) => {
          const studId = data[tableMeta.rowIndex]._id;
          return (
            <Link to={`/tutor/tutor-chat/${studId}`} className="message-button">
              Message
            </Link>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Give Tasks",
      options: {
        customBodyRender: (value, tableMeta) => {
          const studId = data[tableMeta.rowIndex]._id;
          return (
            <Link to={`/tutor/give-tasks/${studId}`} className="task-button">
              Give Tasks
            </Link>
          );
        },
      },
    },

    // {
    //   name: 'price',
    //   label: 'Price',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   name: 'Description',
    //   label: 'Description',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "vertical",
    tableBodyMaxHeight: "calc(100vh - 200px)",
    selectableRows: "none",
    downloadOptions: {
      filename: "buyed course_list.csv",
      separator: ",",
    },
    print: false,
    viewColumns: false,
  };

  const customTheme = createTheme({
    palette: {
      primary: {
        main: theme.palette.primary.main,
      },
      secondary: {
        main: theme.palette.secondary.main,
      },
    },
    typography: {
      fontSize: 14,
      h6: {
        fontSize: "1.6rem",
      },
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("Token");

    instance
      .get(`/tutor/buyed-Course/${Tutor._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        const { data } = response;
        setData(data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred while fetching Course Buyers For Tutor");
        }
      });
  }, []);
  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <ThemeProvider theme={customTheme}>
      <div className="main-heading">Buyed Courses</div>
      <div className="table-container">
        <MUIDataTable
          data={data}
          columns={columns}
          options={options}
          className="user-list-table"
        />
      </div>
    </ThemeProvider>
  );
};

export default BuyedCourseList;
