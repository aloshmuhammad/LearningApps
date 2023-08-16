import React from "react";

import {
  Container,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@mui/material";

const Footer = () => {
  return (
    <div className="Container">
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6" color="white">
              Learn-X
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" color="textSecondary">
              <ul style={{ display: "flex", gap: "10px" }}>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
