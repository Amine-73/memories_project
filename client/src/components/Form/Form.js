import useStyles from "./styles";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from "react";

const Form=()=>{
    const [postData,setPostData]=useState({
        creator:'',title:"",message:'',tag:"",selectedFile:''
    })
    const classes = useStyles();
    const handleSubmit=()=>{

    }
    return(
        <Paper>
            <form autoComplete="off" noValidate className="classes.form" onSubmit={handleSubmit}>
                <Typography variant="h6">Creating A Memory</Typography>
                <TextField name='creator' variant="outlined" label='Creator' fullWidth value={postData.creator} onChange={(e)=>{
                    setPostData({...postData,creator:e.target.value})
                }}/>
            </form>
        </Paper>
    )
}
export default Form;