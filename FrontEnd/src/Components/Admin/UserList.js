import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import instance from '../../Axios/axios';
import './UsersList.css'
import ErrorPage from '../Error/ErrorPage';

const UserList = () => {
  const [data, setData] = useState([]);
  const [error,setError]=useState('')
  
  const theme = useTheme();

  const columns = [
    {
      name: 'firstName',
      label: 'Name',
      
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
    {
      name: 'phoneNo',
      label: 'PhoneNo',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Block',
      label: 'Block',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowIndex;
          const rowData = data[rowId];

          return (
            <button style={{backgroundColor:rowData.status?'green':'red'}} onClick={() => handleBlock(rowData)}>{rowData.status?'Unblock':'Block'}</button>
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
      filename: 'employee_list.csv',
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
      fontSize: 14, // Default font size for column labels
      h6: {
        fontSize: '1.6rem', // Font size for main heading
      },
    },
  });

  useEffect(() => {
    const token=localStorage.getItem('Token')
    instance
      .get('/admin/users-list',{headers: {
        Authorization: token
      }})
      .then((response) => {
        setData(response?.data?.Users);
      })
      .catch((err) => {
        console.log(err.response,'po');
        if(err.response){
          setError(err.response.data.error)
        }
        else {
      
          setError("An error occurred while fetching user list.");
        }
      });
  }, []);
  if (error) {
    
    return <ErrorPage message={error} />;
  }

  const handleBlock = (rowData) => {
  
    console.log('Blocking row:', rowData);
    const {_id,status}=rowData
    
    const body={
        userId:_id,
        status:status
    }
    

    instance.post('/admin/block-unblock',body).then((response)=>{
        console.log(response)
        const updatedData=data.map((item)=>{
            if(item._id==rowData._id) {
                item.status=!rowData.status
                return item
            }
            else{
                return item
            }
            
        })
        setData([...updatedData])
        
    }).catch((error)=>{
        console.log(error)

    })
  };

  return (
    <ThemeProvider theme={customTheme}>
  <div className="main-heading">UsersList</div>
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

export default UserList;
