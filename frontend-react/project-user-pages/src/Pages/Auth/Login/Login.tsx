import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LoginService } from "../../../Service/Login.Service";
import { useNavigate } from "react-router-dom";
import { errorMessageLogin } from "../../../Types/error.type";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorBackEnd, setError] = useState<errorMessageLogin>({
    msgEmail: "",
    msgUserName: "",
    msgConfirmPassword: "",
    msgPassword: "",
  });
  const { handleSubmit, handleChange, formData } = LoginService(navigate, setError);
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "3px 3px 3px 4px rgba(0, 0, 0, 0.1)",
        padding: 2,
        marginBottom: 15,
        borderRadius: 5,
      }}
    >
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h3">
          Đăng nhập
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={!!errorBackEnd?.msgEmail}
                helperText={errorBackEnd?.msgEmail}
                fullWidth
                label="Địa chỉ email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errorBackEnd?.msgPassword}
                helperText={errorBackEnd?.msgPassword}
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Đăng nhập
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="/ConfirmEmail" variant="body2">
              Quên mật khẩu
            </Link>
          </Grid>
          <Grid item>
            <Link href="/Register" variant="body2">
              {"Bạn đã có tài khoản chưa ? Đăng ký"}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default Login;
