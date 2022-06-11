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
import "./SignIn.css";
import { Link } from "react-router-dom";
export default function SingIn() {
  const RouterLink = styled(Link)({
    textDecoration: "none",
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
                sx={{ marginBottom: "14px" }}
              >
                Sign In
              </Typography>
            </div>
            <form className="form" noValidate>
              <Grid container spacing={2}>
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary_text"
                className="submit"
                sx={{ marginTop: "20px", marginBottom: "10px" }}
              >
                Sign In
              </Button>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Typography variant="p">
                    <RouterLink to="/signup">
                      Don't Have an Account ? Sign Up
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
