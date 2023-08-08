import React, { useState, useEffect } from 'react';
import instance from '../Axios/axios';
import { useRef } from 'react';
import {
  AppBar,
  Avatar,
  Grid,
  Toolbar,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  styled,
  Paper,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#4caf50',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const ProfileContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
  cursor: 'pointer',
}));

const NameStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: 'black',
  fontSize: '24px',
}));

const InfoStyled = styled(Typography)(({ theme }) => ({
  color: 'black',
  fontSize: '18px',
  marginBottom: theme.spacing(1),
}));

const EditButtons = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& > button': {
    marginRight: theme.spacing(2),
    color: 'white',
    borderColor: 'white',
  },
}));

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');

  const [info, setInfo] = useState([]);
  
  const profilePictureInputRef = useRef(null)
  const [profilePicture, setProfilePicture] = useState(null);

  const handleEditClick = () => {
    setEditing(true);
    setFirstName(info?.firstName || '');
    setLastName(info?.lastName || '');
    setEmail(info?.email || '');
    setPhoneNo(info?.phoneNo || '');
  };
  const handleProfilePictureClick = () => {
    if (profilePictureInputRef.current) {
      profilePictureInputRef.current.click();
    }
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSaveClick = () => {
    setEditing(false);
    const token = localStorage?.getItem('userToken');
    let User = JSON.parse(localStorage.getItem('UserInfo'));
    const formData = new FormData();
    formData.append('UserId', User._id);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNo', phoneNo);
    if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }
   

    instance
      .put('/auth/profile-edit', formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        setInfo(res?.data?.updatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Reset the form fields to their original values if needed.
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const User = JSON.parse(localStorage.getItem('UserInfo'));
    instance
      .get(`/auth/get-profile/${User._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        const { data } = res;
        setInfo(data?.getProfile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <div>
      <ThemeProvider theme={theme}>
        <ProfileContainer container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <AvatarStyled
                alt="User Profile Picture"
                src={info?.profileUrl}
                onClick={ handleProfilePictureClick}
              />
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  {editing ? (
                    <>
                      <TextField
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        className="name"
                        sx={{ mt: 2 }}
                        InputProps={{
                          style: { color: 'black' },
                        }}
                      />
                      <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        className="bio"
                        sx={{ mt: 2 }}
                        InputProps={{
                          style: { color: 'black' },
                        }}
                      />
                      <TextField
                        label="Phone No"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        fullWidth
                        variant="outlined"
                        className="bio"
                        sx={{ mt: 2 }}
                        InputProps={{
                          style: { color: 'black' },
                        }}
                      />
                      <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        variant="outlined"
                        className="bio"
                        sx={{ mt: 2 }}
                        InputProps={{
                          style: { color: 'black' },
                        }}
                      />
                      <input
          ref={profilePictureInputRef} // Attach the ref to the input element
          id="profilePictureInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleProfilePictureChange}
        />
                    </>
                  ) : (
                    <>
                      <NameStyled variant="h4">
                        {info?.firstName} {info?.lastName}
                      </NameStyled>
                      <InfoStyled variant="subtitle1">{info?.email}</InfoStyled>
                      <InfoStyled variant="subtitle1">{info?.phoneNo}</InfoStyled>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {editing ? (
                    <EditButtons>
                      <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </EditButtons>
                  ) : (
                    <Button variant="outlined" color="primary" onClick={handleEditClick}>
                      Edit Profile
                    </Button>
                  )}
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </ProfileContainer>
      </ThemeProvider>
    </div>
  );
};

export default UserProfile;
