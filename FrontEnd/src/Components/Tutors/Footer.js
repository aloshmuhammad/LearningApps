import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor:'antiquewhite', color:'black', py: 4 }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ flexBasis: '40%' }}>
            <Box mb={2}>
              <Typography variant='h5' sx={{ color:'black', mb: 2 }}>
                Tutor Hub
              </Typography>
            </Box>
            <Typography variant='body1' sx={{ color: 'black' }}>
              Web-based platform that provides a streamlined and efficient way for teachers to manage their online classes.
              The platform is designed to simplify communication and collaboration between teachers and students, and to make it easy for students to access and submit their assignments online.
            </Typography>
          </Box>
          <Box sx={{ flexBasis: '30%' }}>
            <Typography variant='subtitle1' sx={{ color: 'black', mb: 2 }}>
              Resources
            </Typography>
            <List sx={{ color: 'black', mt: 1 }}>
              <ListItem sx={{ mb: 1 }}>NodeJs</ListItem>
              <ListItem sx={{ mb: 1 }}>Express</ListItem>
              <ListItem sx={{ mb: 1 }}>React</ListItem>
              <ListItem sx={{ mb: 1 }}>MongoDb</ListItem>
              <ListItem sx={{ mb: 1 }}>Flutter</ListItem>
              <ListItem sx={{ mb: 1 }}>Unity</ListItem>
            </List>
          </Box>
        </Box>
        <Box>
          <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
            <Typography variant='body2' sx={{ color: 'black' }}>Alosh Muhammad. All rights reserved</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
