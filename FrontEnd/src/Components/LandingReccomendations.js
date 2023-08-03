import React from 'react'
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Image3 from '../Images/flutter.png'
import Image4 from '../Images/React.png'

const LandingReccomendations = () => {
  return (
    <div>
       <h1 className='Text'>Reccomendations</h1>
    <Grid container spacing={2}>
      <Grid item xs={12}>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Card sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            <CardMedia
                component="img"
                height="250"
                width='250'
                image={Image3}
                alt="Image 1"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" color={'whitesmoke'} component="div">
            Flutter
          </Typography>
          <Typography variant="body2" color={'whitesmoke'}>
          Flutter is Google's portable UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            <CardMedia
                component="img"
                height="250"
                width='250'
                image={Image4}
                alt="Image 4"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div" color={'whitesmoke'}>
            React
          </Typography>
          <Typography variant="body2"  color={'whitesmoke'}>
          Flutter is Google's portable UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
          <Card sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            <CardMedia
                component="img"
                height="250"
                width='250'
                image={Image3}
                alt="Image 1"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div" color={'whitesmoke'}>
            Node.js
          </Typography>
          <Typography variant="body2"  color={'whitesmoke'}>
          Flutter is Google's portable UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            <CardMedia
                component="img"
                height="250"
                width='250'
                image={Image3}
                alt="Image 1"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div" color={'whitesmoke'}>
            Flutter
          </Typography>
          <Typography variant="body2" color={'whitesmoke'}>
          Flutter is Google's portable UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid> 
    </div>
  )
}

export default LandingReccomendations
