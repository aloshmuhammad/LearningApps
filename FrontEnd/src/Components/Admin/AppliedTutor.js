import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import instance from "../../Axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./UsersList.css";
import ErrorPage from "../Error/ErrorPage";

const AppliedTutor = () => {
  const [data, setData] = useState([]);
  const [recruited, setRecruited] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();

  const columns = [
    {
      name: "name",
      label: "Name",
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
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "highestqualification",
      label: "Qualification",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "coverletter",
      label: "Coverletter",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "resumeurl",
      label: "Resume",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <a href={value} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          );
        },
      },
    },
    {
      name: "Recurit",
      label: "Recruit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowIndex;
          const rowData = data[rowId];

          return (
            <button
              style={{ backgroundColor: rowData.status ? "Green" : "red" }}
              onClick={() => handleRecuruit(rowData)}
            >
              {rowData.status ? "Recruited" : "Recruit"}
            </button>
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
      filename: "applied tuotors_list.csv",
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
      .get("/admin/applied-tutors", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response?.data?.appliedTutors);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred Fetching Applied Tutors.");
        }
      });
  }, []);
  if (error) {
    return <ErrorPage message={error} />;
  }

  const handleRecuruit = (rowData) => {
    const token = localStorage.getItem("Token");
    console.log("Blocking row:", rowData);
    rowData.status = true;
    const email = rowData.email;
    console.log(email, "lk");

    instance
      .post("/admin/recruit-tutor", rowData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response?.status) {
          toast.success("Tutor Recruited SuccessFully");
          setRecruited(true);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred Fetching Applied Tutors.");
        }
        if (error) {
          return <ErrorPage message={error} />;
        }
      });
  };
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <div className="main-heading">Applied Tutors</div>
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

export default AppliedTutor;
