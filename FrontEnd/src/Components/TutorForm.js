import {React  ,useState,useEffect } from 'react';
import { useFormik, Form } from 'formik';
import tutorapplySchema from './Validation/TutorsApply';
import instance from '../Axios/axios';
import { useNavigate } from 'react-router-dom';


import {
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  FormHelperText,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const theme = createTheme();
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(3),
  backgroundColor: 'whitesmoke',
  width:'100%'
}));

const MainContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: 'whitesmoke',
  marginTop: '64px', // Adjust the margin based on the app bar height
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 600, // Adjust the desired width
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  position: 'relative',
  zIndex: 1,
}));


const FormHeader = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: 'none',
  borderRadius: '8px 8px 0 0',
  
}));

const FormContent = styled(Box)(({ theme }) => ({
  width: '100%',
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const FileInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const FileInput = styled(Input)(({ theme }) => ({
  display: 'none',
}));

const FileInputLabel = styled(InputLabel)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Navbar = styled(AppBar)(({ theme }) => ({
  width: '100%',
  top: 0,
  left: 0,
  right: 0,
  position: 'fixed',
  marginBottom: theme.spacing(3),
  boxShadow: 'none',
  borderRadius: '8px',
}));

const TutorForm = () => {
  
  const [certificate, setCertificate] = useState(null);
  const [error,setError]=useState('')
  const navigate=useNavigate()


  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      address: '',
      age: '',
      highestqualification: '',
      coverletter: '',
      email:'',
     
    },
    validationSchema: tutorapplySchema,
    onSubmit: (values) => {
    
     console.log(values)
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('address', values.address);
      formData.append('age', values.age);
      formData.append('highestqualification', values.highestqualification);
      formData.append('coverletter', values.coverletter);
      formData.append('email',values.email)
      formData.append('course',values.course)
      formData.append('certificate', certificate);
      
      instance.post('/tutor/tutor-form',formData).then((response)=>{
        console.log(response)
        if(response?.data?.status)setError('Applicaton Submitted Successfully')
        navigate('/')
      }).then((err)=>{
        console.log(err)
      })
      
    },
  });

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    setCertificate(file);
  };

  return (
    <div >
       <Navbar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div">
              Tutor Registration
            </Typography>
          </Toolbar>
        </Navbar>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          paddingTop="64px" // Adjust the padding based on the app bar height
        >
          <PageContainer>
          <MainContainer maxWidth="sm">
            <FormContainer elevation={3}>
              <FormContent>
                <form onSubmit={handleSubmit}>
                  <FormField
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    fullWidth
                  />
                  {errors.name ? (
                    <p style={{ color: 'red' }}>{errors.name}</p>
                  ) : (
                    <p></p>
                  )}
                  <FormField
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {errors.address ? (
                    <p style={{ color: 'red' }}>{errors.address}</p>
                  ) : (
                    <p></p>
                  )}
                   <FormField
                    label="Course"
                    name="course"
                    value={values.course}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {errors.course ? (
                    <p style={{ color: 'red' }}>{errors.course}</p>
                  ) : (
                    <p></p>
                  )}
                  <FormField
                    label="Age"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {errors.age ? (
                    <p style={{ color: 'red' }}>{errors.age}</p>
                  ) : (
                    <p></p>
                  )}
                   <FormField
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {errors.age ? (
                    <p style={{ color: 'red' }}>{errors.email}</p>
                  ) : (
                    <p></p>
                  )}
                  <FormField
                    label="Highest Qualification"
                    name="highestqualification"
                    value={values.highestqualification}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {errors.highestqualification ? (
                    <p style={{ color: 'red' }}>{errors.highestqualification}</p>
                  ) : (
                    <p></p>
                  )}
                  
                  <FormField
                    label="Cover Letter"
                    name="coverletter"
                    value={values.coverletter}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                  {errors.coverletter ? (
                    <p style={{ color: 'red' }}>{errors.coverletter}</p>
                  ) : (
                    <p></p>
                  )}
                  <FormControl fullWidth>
                    <FormLabel htmlFor="certificate-input">Resume (PDF)</FormLabel>
                    <FileInputContainer>
                      <FileInputLabel htmlFor="certificate-input">
                        Select a PDF file
                      </FileInputLabel>
                      <label htmlFor="certificate-input">
                        <FileInput
                          id="certificate-input"
                          type="file"
                          accept="application/pdf"
                          onChange={handleCertificateChange}
                        />
                        <IconButton component="span">
                          <CloudUploadIcon />
                        </IconButton>
                      </label>
                    </FileInputContainer>
                    {certificate && (
                      <FormHelperText>
                        Uploaded: {certificate.name} (
                        {Math.round(certificate.size / 1024)} KB)
                      </FormHelperText>
                    )}
                  </FormControl>
                  <SubmitButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                  >
                    Submit
                  </SubmitButton>
                  {/* <p style={{color:'red'}}>{error}</p> */}
                </form>
                
              </FormContent>
            </FormContainer>
          </MainContainer>
          </PageContainer>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default TutorForm;
