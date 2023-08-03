import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Image2 from '../Images/landing.png'

import Button from '@mui/material/Button';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';


import './Navba.css'
import { Container } from '@mui/material';

const Landing = () => {
  return (
    <div>
        <Container >
        <Grid container spacing={2} >
          <Grid className='Grid-Home' item xs={6} sx={{backgroundColor:'black',marginTop:20}} direction="row" spacing={2}>
       <h1 className='Text' >A Big Sale For Ur Big Opprtunity</h1>
       <Button className='Btn' variant="contained" sx={{ backgroundColor: '#21D69F'}}>
      Explore
    </Button>
       </Grid>
       <Grid item xs={6} direction='row' spacing={2}>
        <img className='Images' src={Image2}></img>
       </Grid>
      </Grid>
      

      </Container>
      
    </div>
  )
}

export default Landing
