import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";

import "./UsersList.css";
import ErrorPage from "../Error/ErrorPage";
import instance from "../../Axios/axios";

const CompletedAssignment = () => {
  let Tutor = useSelector((state) => state.tutorInfo.tutor);
  const [data, setData] = useState([]);

  const [error, setError] = useState("");

  const theme = useTheme();

  const columns = [
    {
      name: "submitUrl",
      label: "Completed Assignments",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <a href={value} target="_blank" rel="noopener noreferrer">
              View submitted Assignments
            </a>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "vertical",
    tableBodyMaxHeight: "calc(100vh - 200px)",
    selectableRows: "none",
    downloadOptions: {
      filename: "assignment_list.csv",
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
      fontSize: 14, // Default font size for column labels
      h6: {
        fontSize: "1.6rem", // Font size for main heading
      },
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("Token");

    instance
      .get(`/tutor/get-submitassignment/${Tutor._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while fetching Course Buyers For Tutor");
        }
      });
  }, []);

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <div className="main-heading">Assignments</div>
        <div className="table-container">
          <MUIDataTable
            data={data}
            columns={columns}
            options={options}
            className="user-list-table"
          />
        </div>
      </ThemeProvider>
    </>
  );
};

export default CompletedAssignment;
