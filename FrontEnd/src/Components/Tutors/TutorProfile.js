import React, { useState, useEffect } from "react";
import instance from "../../Axios/axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#4caf50",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const ProfileContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 400,
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
  cursor: "pointer",
}));

const NameStyled = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  color: "black",
  fontSize: "24px",
}));

const InfoStyled = styled(Typography)(({ theme }) => ({
  color: "black",
  fontSize: "18px",
  marginBottom: theme.spacing(1),
}));

const EditButtons = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  "& > button": {
    marginRight: theme.spacing(2),
    color: "white",
    borderColor: "white",
  },
}));

const TutorProfile = () => {
  let Tutor = useSelector((state) => state.tutorInfo.tutor);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [highestqualification, setHighestqualification] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  const [email, setEmail] = useState("");

  const [info, setInfo] = useState([]);

  const profilePictureInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleEditClick = () => {
    setEditing(true);
    setName(info?.name || "");
    setAddress(info?.address || "");
    setEmail(info?.email || "");
    setAge(info?.age || "");
    setHighestqualification(info?.highestqualification || "");
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

    const formData = new FormData();
    formData.append("TutorId", Tutor._id);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("highestqualification", highestqualification);
    if (profilePicture) {
      formData.append("TutorprofilePicture", profilePicture);
    }

    const token = localStorage.getItem("Token");

    instance
      .put("/tutor/profile-edit", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
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
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");

    instance
      .get(`/tutor/get-profile/${Tutor._id}`, {
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
                onClick={handleProfilePictureClick}
              />
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  {editing ? (
                    <>
                      <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        className="name"
                        sx={{ mt: 2 }}
                        InputProps={{
                          style: { color: "black" },
                        }}
                      />
                      <TextField
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                        variant="outlined"
                        className="bio"
                        sx={{ mt: 2 }}
                        InputProps={{
                          style: { color: "black" },
                        }}
                      />
                      <TextField
                        label="Highest Qualificatiin"
                        value={highestqualification}
                        onChange={(e) =>
                          setHighestqualification(e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                        className="bio"
                        sx={{ mt: 2 }}
                        InputProps={{
                          style: { color: "black" },
                        }}
                      />
                      <TextField
                        label="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        fullWidth
                        variant="outlined"
                        className="bio"
                        sx={{ mt: 2 }}
                        InputProps={{
                          style: { color: "black" },
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
                          style: { color: "black" },
                        }}
                      />
                      <input
                        ref={profilePictureInputRef}
                        id="profilePictureInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleProfilePictureChange}
                      />
                    </>
                  ) : (
                    <>
                      <NameStyled variant="h4">{Tutor?.name}</NameStyled>
                      <InfoStyled variant="subtitle1">{info?.email}</InfoStyled>
                      <InfoStyled variant="subtitle1">
                        {info?.highestqualification}
                      </InfoStyled>
                      <InfoStyled variant="subtitle1">
                        {info?.address}
                      </InfoStyled>
                      <InfoStyled variant="subtitle1">{info?.age}</InfoStyled>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {editing ? (
                    <EditButtons>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveClick}
                      >
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </EditButtons>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleEditClick}
                    >
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

export default TutorProfile;
