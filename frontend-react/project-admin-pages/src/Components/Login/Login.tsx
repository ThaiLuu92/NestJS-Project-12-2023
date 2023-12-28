import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  AuthState,
} from "../../Redux/Slice/appSlice";
import { useNavigate } from "react-router-dom";
import login from "../../services/auths/login";
import { FormDataLogin } from "../../types/form.type";
import { errorMessageLogin } from "../../types/error.type";

const defaultTheme = createTheme();


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(
  //   (state: { app: AuthState }) => state.app.isLoggedIn
  // );
  const onSubmit = (data: FormDataLogin) => {};
  const [error1, setError] = React.useState<errorMessageLogin>({
    msgEmail: "",
    msgPassword: "",
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    try {
      const data = await login(email, password);
      
      const user = data.user; 
      if (user) {
        dispatch(loginSuccess(user));
        navigate("/")
      }
    } catch (error) {
      setError(error as errorMessageLogin);
      dispatch(loginFailure());
    }
  };

  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "3px 3px 3px 4px rgba(0, 0, 0, 0.1)", // Điều chỉnh giá trị box shadow ở đây
            padding: 2, // Padding để tạo khoảng trắng xung quanh Box (tùy chọn)
            marginBottom: 24,
            borderRadius: 5,
          }}
        >
          <Typography component="h1" variant="h3">
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={error1?.msgEmail ? true : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Địa chỉ email"
              name="email"
              autoComplete="email"
              helperText={error1?.msgEmail}
              autoFocus
              variant="outlined"
            />
            <TextField
              error={error1?.msgPassword ? true : false}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={error1?.msgPassword}
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
