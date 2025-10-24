import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import {Link} from 'react-router-dom'
import Toolbar from "@mui/material/Toolbar";

const Navbar=()=>{
    const classes=useStyles();
    return( <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                  Memories
                </Typography>
                <div className={classes.brandContainer}>
                    <Typography component={Link} className={classes.heading} variant="h2"></Typography>
                <img
                  src={memories}
                  className={classes.image}
                  alt="memories"
                  height="60"
                />
                </div>
                <Toolbar className={classes.Toolbar}>

                </Toolbar>
                
              </AppBar>);
}
export default Navbar