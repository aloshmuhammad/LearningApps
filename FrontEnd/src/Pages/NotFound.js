import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const NotFound = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h1" sx={{ color: '#e74c3c', fontSize: { xs: '80px', sm: '120px' } }}>404</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" sx={{color:'#fff', fontSize: { xs: '20px', sm: '24px' } }}>Page Not Found</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" component={Link} to="/" sx={{ backgroundColor: '#3498db', color: '#fff', fontSize: { xs: '16px', sm: '18px' }, '&:hover': { backgroundColor: '#2980b9' } }}>Go Back to Home</Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default NotFound;
