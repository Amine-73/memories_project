import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./style.css";
import Input from "./InputAuth";
import { Button } from "@mui/material";

import { useState } from "react";
const Auth = () => {
  const [showPsw, setShowPsw] = useState();
  const [isSignup, setIsSignUp] = useState(false);
  const handleShowPassword = () => setShowPsw((e) => !e);
  const handleSubmit = () => {};
  const handlChange = () => {};
  const switchMode = () => setIsSignUp((e) => !e);

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          marginBottom: "10px",
        }}
        elevation={3}
      >
        <Avatar sx={{ margin: "8px", backgroundColor: "#9c27b0" }}>
          <LockOutlineIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form
          style={{ width: "100%", marginTop: "24px" }}
          onSubmit={handleSubmit}
        >
          <Grid spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handlChange}
                  autoFocus
                />
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handlChange}
                />
              </>
            )}
            <Input
              name="Email"
              label="Email Address"
              handlChange={handlChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handlChange={handlChange}
              type={showPsw ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Passoword"
                handleShowPassword={handlChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: "24px 0 16px" }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid>
            <Button
              onClick={switchMode}
              justify="flex-end"
              sx={{ fontSize: "12px", color: "red" }}
            >
              {isSignup
                ? "Already have an account ? Sign In"
                : "Don't have an account ? Sign Up "}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
