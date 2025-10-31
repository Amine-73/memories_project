import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./style.css";
import Input from "./InputAuth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import du composant
import { jwtDecode } from "jwt-decode";
// And you use it like: const result = jwtDecode(token);

import { useState } from "react";
import { useDispatch } from "react-redux";

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}


const Auth = () => {
  const [showPsw, setShowPsw] = useState();
  const [isSignup, setIsSignUp] = useState(false);
  const [formData,setFormData]=useState(initialState)
  const dispatch = useDispatch();
  const navigate=useNavigate()




  //   FUNCTION
  const switchMode = () => setIsSignUp((e) => !e);
  const handlChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };
  const handleShowPassword = () => setShowPsw((e) => !e);
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData,navigate));
    } else {
      dispatch(signin(formData,navigate));
    }
  };
  const googleSuccess = async (res) => {
    const token = res.credential;
    const result = jwtDecode(token);
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };




  // --- 2. Gestion de l'Échec de Google ---
  const googleFailure = (error) => {
    console.log("La connexion Google a échoué. Réessayez plus tard.", error);
    //   Vous pouvez ajouter ici une alerte ou un message d'erreur pour l'utilisateur
  };

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
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handlChange}
                  autoFocus
                />
                <Input
                  name="lastname"
                  label="last Name"
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
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            // La prop 'text' est souvent utilisée pour personnaliser le texte du bouton.
            text={
              isSignup ? "S'inscrire avec Google" : "Se connecter avec Google"
            }
          />
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
