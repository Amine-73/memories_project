import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import memories from "../../images/memories.png";
import "./styles.css";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useCallback } from "react";


const Navbar = () => {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const location=useLocation()




  const Logout = useCallback(() => { // 💡 Wrap Logout in useCallback for dependency stability
    dispatch({ type: 'LOGOUT' });
    navigate("/");
    setUser(null);
}, [dispatch, navigate]); // Dependencies for Logout

useEffect(() => {
    // 1. Logic to sync state upon navigation or component mount (location change)
    // This updates the 'user' state, which triggers the second effect (if implemented) 
    // or the dependency [user?.token]
    const profile = localStorage.getItem('profile');
    if (profile) {
        setUser(JSON.parse(profile));
    }

// 🔑 Only dependency needed here is location and setUser (as it's used to update state)
}, [location, setUser]);


useEffect(() => {
    // 2. Logic to check token expiration (runs whenever user?.token changes)
    const token = user?.token;
    
    if (token) {
        const decodedToken = jwtDecode(token);
        
        // If expired, call Logout()
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            Logout();
        }
    }
// 🔑 Only dependencies needed here are user?.token and Logout
}, [user?.token, Logout]);


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
            <Avatar className="purple" alt={user.result.name} src={user.result.imageUrl}>{user?.name?.charAt(0)}</Avatar>
            <Typography className="userName" variant="h6">{user.result.name}</Typography>
            <Button variant='contained' className='logout' color='secondary' onClick={Logout}>Logout</Button>
          </div>
        ):(
            <Button component={Link} to='/auth'  variant='contained' className='signIn' color='primary'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
