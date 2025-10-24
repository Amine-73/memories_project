
import "./App.css";
import Container from "@mui/material/Container";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "./actions/Posts";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Container maxWidth="lg">
      <Navbar/>
      <Grow in>
        <Container>
          <Grid
            container
            sx={{
              justifyContent: "space-between",
              alignItems: "stretch",

              // Définition de la propriété flexDirection avec des breakpoints
              // Tableau de valeurs : [xs, sm, md, ...]
              flexDirection: ["column-reverse", "row"],
            }}
            spacing={3}
          >
            <Grid size={{ xs: 12, sm: 7 }}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
