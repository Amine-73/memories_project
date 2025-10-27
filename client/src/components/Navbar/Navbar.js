import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import memories from "../../images/memories.png";
import "./styles.css";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
const Navbar = () => {
  const user=null;
  return (
    <AppBar className="appBar" position="static" color="inherit">
      <div className="brandContainer">
        <Typography
          component={Link}
          to={'/'}
          className="heading"
          variant="h2"
        >Memories</Typography>
        <img src={memories} className="image" alt="memories" height="60" />
      </div>
      <Toolbar className="Toolbar">
        {user ? (
          <div className="profile">
            <Avatar className="purple" alt={user.result.name} src={user.result.imageUrl}>{user.name.charAt(0)}</Avatar>
            <Typography className="userName" variant="h6">{user.result.name}</Typography>
            <Button variant='contained' className='logout' color='secondary'>Logout</Button>
          </div>
        ):(
            <Button component={Link} to='/auth'  variant='contained' className='signIn' color='primary'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
