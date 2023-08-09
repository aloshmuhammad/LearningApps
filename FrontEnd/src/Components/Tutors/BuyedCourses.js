import {React,useState,useEffect} from 'react'
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal'
import instance from '../../Axios/axios';
import { useSelector } from 'react-redux';
import './UsersList.css'
import ErrorPage from '../Error/ErrorPage';



const BuyedCourseList = () => {
  let Tutor =useSelector((state)=>state.tutorInfo.tutor)
const [data, setData] = useState([]);
const [error,setError]=useState('')
  
const theme = useTheme();


const columns = [

    {
        name: 'firstName',
        label: 'UserName',
        options: {
          filter: true,
          sort: true,
        },
      },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: true,
      sort: false,
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
  filterType: 'checkbox',
  responsive: 'vertical',
  tableBodyMaxHeight: 'calc(100vh - 200px)',
  selectableRows: 'none',
  downloadOptions: {
    filename: 'buyed course_list.csv',
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


    const token=localStorage.getItem('Token')


  instance
    .get(`/tutor/buyed-Course/${Tutor._id}`,{headers: {
        Authorization: token
      }})
    .then((response) => {
        const{data}=response
        setData(data)
       
      
     
        
       
      

    })
    .catch((err) => {
      if(err.response){
        setError(err.response.data.error)
      }
      else {
    
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

  

export default BuyedCourseList
