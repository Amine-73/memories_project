import useStyles from "./styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/Posts";
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';


const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user=JSON.parse(localStorage.getItem('profile'));


  const Likes=()=>{
    if(post.likes.length>0){
      return post.likes.find((like)=>like===(user?.result?.googleId || user?.result?._id))
      ?(
        <><ThumbUpAltIcon fontSize="small"/>&nbsp;{post.likes.length>2 ? `You and ${post.likes.length-1} others`: // ✅ CORRECTED LOGIC
`${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`} </>
      ):(
        <><ThumbUpAltIcon fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length===1 ? 'Like':'Likes'}</>
      )
    }
    return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        sx={{ 
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken"
  }}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator)&&(
          <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
        
        )}
        
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" className={classes.title} gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component={"p"}>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={!user?.result}
        >
          <Likes/>
        </Button>
        {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator)&&(
            <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
          )}
        
      </CardActions>
    </Card>
  );
};
export default Post;
