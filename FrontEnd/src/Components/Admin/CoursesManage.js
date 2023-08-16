import { React, useEffect, useState } from "react";
import { Button } from "@mui/material";

import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import instance from "../../Axios/axios";
import "./UsersList.css";
import SendIcon from "@mui/icons-material/Send";
import ErrorPage from "../Error/ErrorPage";

const CoursesManage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const theme = useTheme();
  useEffect(() => {
    const token = localStorage.getItem("Token");
    instance
      .get("/admin/course-List", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        const { data } = response;
        console.log(data, "lo");
        setData(data?.course);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred while fetching Course list.");
        }
      });
  }, []);
  if (error) {
    return <ErrorPage message={error} />;
  }

  const columns = [
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Description",
      label: "Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: 'Block',
    //   label: 'Block',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       const rowId = tableMeta.rowIndex;
    //       const rowData = data[rowId];

    //     //   return (

    //     //   );
    //     },
    //   },
    // },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "vertical",
    tableBodyMaxHeight: "calc(100vh - 200px)",
    selectableRows: "none",
    downloadOptions: {
      filename: "employee_list.csv",
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

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <div className="main-heading">Courses</div>
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

export default CoursesManage;
