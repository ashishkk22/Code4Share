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
import "./changePass.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  userChangePass,
  userSignUp,
  verifyOtp,
} from "../../Redux/Features/authSlice";

export default function ChangePass() {
  const { loading, email } = useSelector(state => ({
    ...state.auth,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const RouterLink = styled(Link)({
    // textDecoration: "none",
    color: "#ffce6d",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = dataForm => {
    dispatch(userChangePass({ dataForm, toast, navigate }));
  };
  return (
    <>
      <div className="change-container">
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
                Change Password
              </Typography>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    id="oldPassword"
                    color="primary_text"
                    autoComplete="current-password"
                    {...register("oldPassword", {
                      required: "Please enter the password",
                    })}
                    error={Boolean(errors.oldPassword)}
                    helperText={
                      errors.oldPassword && errors.oldPassword.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    color="primary_text"
                    autoComplete="current-password"
                    {...register("newPassword", {
                      required: "Please enter the new password",
                    })}
                    error={Boolean(errors.newPassword)}
                    helperText={
                      errors.newPassword && errors.newPassword.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="newPassword2"
                    label="Confirm New Password"
                    type="password"
                    id="newPassword2"
                    color="primary_text"
                    autoComplete="current-password"
                    {...register("newPassword2", {
                      required: "Please confirm the password",
                      validate: val => {
                        if (watch("newPassword") != val) {
                          return "Your both password should match";
                        }
                      },
                    })}
                    error={Boolean(errors.newPassword2)}
                    helperText={
                      errors.newPassword2 && errors.newPassword2.message
                    }
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
                Change Password
              </Button>
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
