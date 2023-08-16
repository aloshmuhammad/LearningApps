import {React,useState,useEffect,} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal'
import instance from '../Axios/axios';
import './UsersList.css'

import ErrorPage from './Error/ErrorPage';


const MyTutors = () => {
    const navigate=useNavigate
const [data, setData] = useState([]);
const [error,setError]=useState('')
  
const theme = useTheme();





const columns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'email',
    label: 'email',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: '_id',
    label: 'Message',
    options: {
      customBodyRender: (value, tableMeta) => {
        const tutorId = data[tableMeta.rowIndex]._id;
        return (
          <Link to={`/user/chat/${tutorId}`} className="message-button">
            Message
          </Link>
        );
      },
    },
  },


  
];

const options = {
  filterType: 'checkbox',
  responsive: 'vertical',
  tableBodyMaxHeight: 'calc(100vh - 200px)',
  selectableRows: 'none',
  downloadOptions: {
    filename: 'tutors_list.csv',
    separator: ',',
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
      fontSize: '1.6rem',
    },
  },
});

useEffect(() => {
  const token=localStorage.getItem('userToken')
  const User=JSON.parse(localStorage.getItem('UserInfo'))
  instance
    .get(`/auth/tutors-list/${User._id}`,{headers: {
      Authorization: token
    }})
    .then((response) => {
      console.log(response)
     setData(response?.data);
    })
    .catch((err) => {
      console.log(err);
      if(err.response){
        setError(err.response.data.error)
      }
      else {
    
        setError("An error occoured while fetching tutuors list.");
      }
    });
}, []);
if (error) {
    
  return <ErrorPage message={error} />;
}





  
 



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


    </ThemeProvider>
  );
};

  

export default MyTutors

