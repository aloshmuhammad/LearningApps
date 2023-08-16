import { React, useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import instance from "../../Axios/axios";
import "./UsersList.css";

const BuyedCourseList = () => {
  const [data, setData] = useState([]);

  const theme = useTheme();

  const columns = [
    {
      name: "userName",
      label: "UserName",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "title",
      label: "Course",
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
        sort: true,
      },
    },
    {
      name: "Description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
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
      .get("/admin/buyed-Course", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data.buyCourses, "pk");
        const flattenedData = response?.data?.buyCourses?.flatMap((item) =>
          item?.courses?.map((course) => ({
            title: course?.title,
            price: course?.price,
            Description: course?.Description,
            userName: item.user.firstName,
          }))
        );
        setData(flattenedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
