import React from 'react'
import { Card, CardContent, CardMedia, Typography ,Grid} from '@mui/material';
import Image3 from '../Images/flutter.png'
import Image4 from '../Images/React.png'
const OffersLanding = () => {
 return(
    <>
    <h1 className='Text'>Offers</h1>
    <Grid container spacing={2}>
      <Grid item xs={12}>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Card sx={{ maxWidth: 245 ,maxHeight:350,backgroundColor:'black'}}>
            <div style={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    width="250"
                    image={Image3}
                    alt="Image 1"
                  />
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 30,
                      left: 50,
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    20% off
                  </Typography>
                </div>
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
            <div style={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    width="250"
                    image={Image4}
                    alt="Image 1"
                  />
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 30,
                      left: 50,
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    20% off
                  </Typography>
                </div>
        
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
          <div style={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    width="250"
                    image={Image3}
                    alt="Image 1"
                  />
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 30,
                      left: 50,
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    20% off
                  </Typography>
                </div>
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
            <div style={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    width="250"
                    image={Image3}
                    alt="Image 1"
                  />
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 30,
                      left: 50,
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    20% off
                  </Typography>
                </div>
              <CardContent>
              <Typography gutterBottom variant="h5" component="div" color={'whitesmoke'}>
            Flutter
          </Typography>
          <Typography variant="body2"  color={'whitesmoke'}>
          Flutter is Google's portable UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid> 
    
    </>

  )
}

export default OffersLanding
