//https://material-ui.com/getting-started/templates/blog/#

import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Post from "../Post/PostTemplate";
import Pepette from "../../../Images/sad_pepette.jpg";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ViewPostPopup from "../Post/ViewPostPopup";
import EditAccountPopup from "../edit_account_form";

import {Header, Footer} from '../../index';
import ProfileStats from './ProfileStats';

// Styling for the material UI components 
const useStyles = makeStyles((theme) => ({
    editContainer: {
        marginBottom: "3%"
    },
    mainGrid: {
        marginTop: theme.spacing(1),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    followBtnContainer: {
        marginBottom: "0.5%"
    }
}));

export default function UserProfile(props) {
    const classes = useStyles();
    const [follows, setFollows] = useState();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [openPost, setOpenPost] = useState(false);
    const [postViewed, setPostViewed] = useState();
    const [open, setOpen] = useState(false);

    // Checking the backend to see if the user is logged in
    useEffect(() => {
        if(localStorage.getItem("user") === null)
            window.location = "/login#redirect";
    }, [])

    // Checking the backend to see if the user is logged in
    useEffect(() => {
        if(localStorage.getItem("user") === null)
            window.location = "/login#redirect";
    }, [])

    const usernameS = {currentUsername: JSON.parse(localStorage.getItem("user")).username, visitedUsername: window.location.href.split("/")[4]};

    // Check if user already follows the other
    useEffect(() => {
       axios.post("http://localhost:5000/api/follow/checkfollow", usernameS)
           .then(res => {
                if(res.data.followersList.includes(usernameS.currentUsername)){
                    //show unfollow
                    setFollows(true);
                }
                else{
                    //show follow
                    setFollows(false);
                }
           })
           .catch(error => console.log(error));
        
        axios.get("http://localhost:5000/api/users/getUser?username=" + window.location.href.split("/")[4])
        .then(res => {
            console.log(res);
            if(res.data.error){
                window.location.href = "/Home/#";
            }
            setUser(res.data.user);
        })
    }, []);

    // Get all posts made by this profile's user
    useEffect(() => {
        axios.post("http://localhost:5000/api/posts/getUserPosts", {username: window.location.href.split("/")[4]})
        .then(res => {
            console.log(res);
            console.log(res.data)
            setPosts(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    function handleFollow(){
        axios.post("http://localhost:5000/api/follow/" + (follows ? "unfollow" : "follow"), usernameS)
            .then(res => {
                setFollows(!follows);
                axios.get("http://localhost:5000/api/users/getUser?username=" + window.location.href.split("/")[4])
                    .then(res => {
                        setUser(res.data.user);    
                })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }

    // Opens a popup to view the post & be able to comment
    function handleViewPost(post){
        setPostViewed(post);
        setOpenPost(!openPost);
    }

    function handleOpen(){
        setOpen(!open);
    }

    console.log(props.currentUser);
    return !user ? null : (
        <div>
            {openPost ? <ViewPostPopup open={openPost} onClose={handleViewPost} post={postViewed}/> : null}
            {open ? <EditAccountPopup open={open} onClose={handleOpen}/> : null}
            <Container maxWidth="lg">
                <Header title="MemeSpace" />
                {/* Profile information (name, number of posts/followers/following)  */}
                    <h1 style={{fontWeight:"550"}}>{window.location.href.split("/")[4]}</h1>
                    <div className="profile-picture-container">
                        <img alt="Profile Avatar" className="profile-picture" src={Pepette} height="150px" width="150px"/>
                    </div>
                    <ProfileStats posts={posts} user={user || null}/>
                    <Container className={classes.followBtnContainer}>
                        <Button onClick={handleFollow} variant="info">{follows ? "Unfollow" : "Follow"}</Button>
                    </Container>
                    {usernameS.currentUsername === usernameS.visitedUsername ? 
                        <Container className={classes.editContainer}>
                            <Button onClick={handleOpen} variant="secondary" >Edit Account</Button>
                        </Container>
                        :
                        null}  
            </Container>
            {/* Feed containing all of visited user's posts */}
            <Container>
                <Grid container justify="flex-start" spacing={6} >
                    <Divider />
                    {posts.map(post => {
                        return(
                            <div onClick={() => handleViewPost(post)}>
                                <Post 
                                    width="300px" 
                                    author={post.username} 
                                    date={post.date} 
                                    base64img={post.image.file} 
                                    fileEncoding={post.image.encoding} 
                                    text={post.description} 
                                    postID={post.postID} 
                                    comments={post.comments} 
                                    showActions={false}
                                    
                                />
                            </div>
                        )
                   })}
                </Grid>
            </Container>
            <Footer title="Footer" description="This is a footer" />
        </div>
    );
}