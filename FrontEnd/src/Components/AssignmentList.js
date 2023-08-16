import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import instance from "../Axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";

import "./UsersList.css";
import ErrorPage from "./Error/ErrorPage";

const AssignmentList = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const theme = useTheme();

  const columns = [
    {
      name: "taskUrl",
      label: "Task",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <a href={value} target="_blank" rel="noopener noreferrer">
              View Assignments
            </a>
          );
        },
      },
    },
    {
      name: "id",
      label: "Submit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const tutorId = data[tableMeta.rowIndex].tutorId; // Modify this line to get the tutorId from the data array
          const assignmentStatus = data[tableMeta.rowIndex].status;

          return (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAssignmentSubmission(tutorId)} // Pass the tutorId to the function
              >
                Submit
              </Button>
              <TextField
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                variant="outlined"
                label="Upload Assignment File"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
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
  const handleAssignmentSubmission = (tutorId) => {
    if (file) {
      const formData = new FormData();
      formData.append("tutorId", tutorId);
      formData.append("file", file);

      instance
        .post("/auth/submit-assignment", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Assignment submitted successfully");
        })
        .catch((error) => {
          console.error("Error submitting assignment:", error);
          toast.error("Error submitting assignment");
        });
    } else {
      toast.success("Assignment submitted successfully");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const User = JSON.parse(localStorage.getItem("UserInfo"));
    instance
      .get(`/auth/get-assignment/${User._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response, "op");
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
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

export default AssignmentList;
