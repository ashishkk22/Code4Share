import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  styled,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import "./signUp.css";
import { Link } from "react-router-dom";
export default function SignUp() {
  const RouterLink = styled(Link)({
    // textDecoration: "none",
    color: "#ffce6d",
  });
  return (
    <>
      <div className="signup-container">
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: "#1c1e29",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <CssBaseline />
          <div className="paper formDiv">
            <div>
              <Typography
                component="h1"
                variant="h5"
                sx={{ paddingBottom: "10px" }}
              >
                Sign up
              </Typography>
            </div>
            <form className="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    color="primary_text"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    color="primary_text"
                    autoComplete="lname"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    color="primary_text"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    color="primary_text"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary_text" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary_text"
                className="submit"
                sx={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Sign Up
              </Button>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Typography variant="p">
                    <RouterLink to="/signin">
                      Already have an account? Sign in
                    </RouterLink>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
}
