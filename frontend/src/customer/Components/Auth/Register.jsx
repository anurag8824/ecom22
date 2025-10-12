import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";

export default function RegisterUserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const mobileFromLogin = location.state?.mobile || "";
  const [mobile, setMobile] = useState(mobileFromLogin);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { auth } = useSelector((store) => store);

  const handleClose = () => setOpenSnackBar(false);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user || auth.error) setOpenSnackBar(true);
    if (auth.user) navigate("/"); // Redirect on success
  }, [auth.user, auth.error, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      dob: data.get("dob"), // 💡 include DOB here
      mobile: mobile,
    };
    dispatch(register(userData));
  };

   // 🧠 Auto-fill + auto-submit effect
   useEffect(() => {
    const dummyUser = {
      firstName: "John",
      lastName: "Doe",
      email: `john${Math.floor(Math.random() * 10000)}@example.com`,
      password: "Password@123",
      dob: "1995-05-15",
      mobile: mobile,
    };

    // Delay just a bit for UX clarity
    const timer = setTimeout(() => {
      dispatch(register(dummyUser));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, mobile]);

  return (
    <div className="hidden">
      <form style={{
        marginLeft: "35px",
        marginRight: "35px",

      }} onSubmit={(e) => e.preventDefault()} >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Mobile"
              fullWidth
              value={mobile}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required name="firstName" label="First Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required name="lastName" label="Last Name" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField required name="email" label="Email" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField name="password" label="Password (optional)" fullWidth type="password" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="dob"
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              className="bg-[#9155FD] w-full"
              sx={{ padding: ".8rem 0" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>

        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={auth.error ? "error" : "success"}>
            {auth.error ? auth.error : "Register Success"}
          </Alert>
        </Snackbar>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center ">
          <p className="m-0 p-0">If you already have an account?</p>
          <Button onClick={() => navigate("/login")} className="ml-5" size="small">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
