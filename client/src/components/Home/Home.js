import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { getPosts } from "../../actions/Posts";
import { useDispatch } from "react-redux";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
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
  );
};

export default Home;
