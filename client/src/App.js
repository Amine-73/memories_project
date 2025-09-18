import AppBar from "@mui/material/AppBar";
import "./App.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import memories from "./images/memories.png";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";




function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          src={memories}
          className={classes.image}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            sx={{ justifyContent: "space-between", alignItems: "stretch" }}
            spacing={3}
          >
            <Grid size={{ xs: 12, sm: 7 }}>
              <Posts />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>

  );
}

export default App;
