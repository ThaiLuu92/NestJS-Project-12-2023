import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { errorMessageLogin } from "../../../Types/error.type";
import { RegisterService } from "../../../Service/Register.Service";
const Register = () => {
  const navigate = useNavigate();
  const [errorBackEnd, setError] = useState<errorMessageLogin>({
    msgEmail: "",
    msgUserName: "",
    msgConfirmPassword: "",
    msgPassword: "",
  });

  const { formData, handleChange, handleSubmit } = RegisterService(
    setError,
    navigate
  );

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
          Đăng ký
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
               error={!!errorBackEnd?.msgUserName}
               helperText={errorBackEnd?.msgUserName}
                fullWidth
                label="Tên tài khoản"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
               error={!!errorBackEnd?.msgConfirmPassword}
               helperText={errorBackEnd?.msgConfirmPassword}
                fullWidth
                label="Nhập lại mật khẩu"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Đăng ký
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/Login" variant="body2">
              Bạn đã có tài khoản chưa? Đăng nhập
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default Register;
