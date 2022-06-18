import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Backdrop,
  CircularProgress,
  Checkbox,
  styled,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { userSignIn } from "../../Redux/Features/authSlice";
export default function SingIn() {
  const { loading } = useSelector(state => ({
    ...state.auth,
  }));
  const RouterLink = styled(Link)({
    textDecoration: "none",
    color: "#ffce6d",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = dataForm => {
    dispatch(userSignIn({ dataForm, toast, navigate }));
  };

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
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    color="primary_text"
                    autoComplete="email"
                    {...register("email", {
                      required: "Please enter the email id",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    color="primary_text"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Please enter the password",
                    })}
                    error={Boolean(errors.password)}
                    helperText={errors.password && errors.password.message}
                  />
                </Grid>
              </Grid>
              <Grid container direction="column" mt={2}>
                <Grid item>
                  <Typography variant="p">
                    <RouterLink to="/forgotPass">Forgot password?</RouterLink>
                  </Typography>
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
            <div>
              <Backdrop
                sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress color="primary_text" />
              </Backdrop>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
