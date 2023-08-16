import { React, useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import instance from "../../Axios/axios";
import "./UsersList.css";
import ErrorPage from "../Error/ErrorPage";

const TutorsList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const theme = useTheme();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

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
      label: "email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "PhoneNo",
      label: "PhoneNo",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "course",
      label: "Course",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Block",
      label: "Block",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowIndex;
          const rowData = data[rowId];

          return (
            <button
              style={{ backgroundColor: rowData.status ? "green" : "red" }}
              onClick={() => handleBlock(rowData)}
            >
              {rowData.status ? "Unblock" : "Block"}
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
      filename: "tutors_list.csv",
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
      .get("/admin/tutors-list", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setData(response.data?.tutors);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred while fetching user list.");
        }
      });
  }, []);
  if (error) {
    return <ErrorPage message={error} />;
  }

  const handleBlock = (rowData) => {
    setSelectedTutor(rowData);
    setShowModal(true);
  };

  const confirmAction = () => {
    console.log("Blocking row:", selectedTutor);
    const { _id, status } = selectedTutor;

    const body = {
      userId: _id,
      status: status,
    };

    instance
      .post("/admin/tutor-block", body)
      .then((response) => {
        console.log(response);
        const updatedData = data.map((item) => {
          if (item._id == selectedTutor._id) {
            item.status = !selectedTutor.status;
            return item;
          } else {
            return item;
          }
        });
        setData([...updatedData]);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className="main-heading">TutorsList</div>
      <div className="table-container">
        <MUIDataTable
          data={data}
          columns={columns}
          options={options}
          className="user-list-table"
        />
      </div>

      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="confirm-modal-title"
      >
        <div className="modal-content">
          <h2 id="confirm-modal-title">Confirmation</h2>
          <p>Are you sure you want to perform this action?</p>
          <div className="modal-buttons">
            <button onClick={confirmAction}>Yes</button>
            <button onClick={closeModal}>No</button>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  );
};

export default TutorsList;
