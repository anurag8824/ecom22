import * as React from "react";
import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginWithOtp, sendOtp } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";

export default function LoginUserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");

  const { auth } = useSelector((store) => store);

  const handleCloseSnackBar = () => setOpenSnackBar(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user || auth.error || auth.newUser !== undefined || auth.jwt) {
      setOpenSnackBar(true);

      if (auth.newUser) {
        navigate("/register", { state: { mobile } });
      } else if (auth.jwt) {
        localStorage.setItem("jwt", auth.jwt);
        navigate("/");
      }
    }
  }, [auth.user, auth.error, auth.newUser, auth.jwt, navigate, mobile]);

  const handleSendOtp = () => {
    if (!mobile || mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      setSnackBarMessage("Mobile number must be exactly 10 digits");
      setSnackBarSeverity("error");
      setOpenSnackBar(true);
      return;
    }

    dispatch(sendOtp({ mobile }))
      .then(() => {
        setIsOtpSent(true);
        setSnackBarMessage("OTP sent successfully");
        setSnackBarSeverity("success");
        setOpenSnackBar(true);
      })
      .catch(() => {
        setSnackBarMessage("Failed to send OTP");
        setSnackBarSeverity("error");
        setOpenSnackBar(true);
      });
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    if (!mobile || !otp || mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      setSnackBarMessage("Invalid mobile number");
      setSnackBarSeverity("error");
      setOpenSnackBar(true);
      return;
    }
    dispatch(loginWithOtp(mobile, otp, navigate));
  };

  return (
    <React.Fragment>
      <form onSubmit={handleVerifyOtp}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Mobile"
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          {!isOtpSent ? (
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSendOtp}
                className="bg-[#9155FD] w-full"
                sx={{ padding: ".8rem 0" }}
              >
                Send OTP
              </Button>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <TextField
                  label="OTP"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-[#9155FD] w-full"
                  sx={{ padding: ".8rem 0" }}
                >
                  Verify OTP & Login
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>

      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert severity={snackBarSeverity} onClose={handleCloseSnackBar}>
          {snackBarMessage || (auth.error ? auth.error : "Login successful")}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
