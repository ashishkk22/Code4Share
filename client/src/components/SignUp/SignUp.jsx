import React, { useEffect } from "react";
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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userSignUp, verifyOtp } from "../../Redux/Features/authSlice";

export default function SignUp() {
  const { isOtpSent, fullHash, loading, email } = useSelector(state => ({
    ...state.auth,
  }));
  useEffect(() => {}, [isOtpSent]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const RouterLink = styled(Link)({
    textDecoration: "none",
    color: "#ffce6d",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = dataForm => {
    // dispatch(userSignUp({ dataForm, toast, navigate }));
    if (isOtpSent) {
      dispatch(verifyOtp({ dataForm, email, fullHash, toast, navigate }));
    } else if (!isOtpSent) {
      dispatch(userSignUp({ dataForm, toast }));
    }
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
                sx={{ paddingBottom: "10px" }}
              >
                Sign up
              </Typography>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {isOtpSent ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        disabled={isOtpSent}
                        variant="outlined"
                        {...register("firstName", {
                          required: "Please enter the first name",
                        })}
                        error={Boolean(errors.firstName)}
                        helperText={
                          errors.firstName && errors.firstName.message
                        }
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
                        fullWidth
                        id="lastName"
                        disabled={isOtpSent}
                        label="Last Name"
                        name="lastName"
                        color="primary_text"
                        autoComplete="lname"
                        {...register("lastName", {
                          required: "Please enter the Last name",
                        })}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName && errors.lastName.message}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    disabled={isOtpSent}
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
                    disabled={isOtpSent}
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
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="Password2"
                    label="Confirm  Password"
                    disabled={isOtpSent}
                    type="password"
                    id="Password2"
                    color="primary_text"
                    autoComplete="current-password"
                    {...register("Password2", {
                      required: "Please confirm the password",
                      validate: val => {
                        if (watch("password") != val) {
                          return "Your both password should match";
                        }
                      },
                    })}
                    error={Boolean(errors.Password2)}
                    helperText={errors.Password2 && errors.Password2.message}
                  />
                </Grid>

                {isOtpSent ? (
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="otp"
                      label="Otp"
                      type="otp"
                      id="otp"
                      color="primary_text"
                      autoComplete="otp"
                      {...register("otp", {
                        required: "Please enter the otp",
                      })}
                      error={Boolean(errors.otp)}
                      helperText={errors.otp && errors.otp.message}
                      autoFocus
                    />
                  </Grid>
                ) : (
                  <></>
                )}
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
                {isOtpSent ? "   Sign Up" : "Send Otp"}
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
