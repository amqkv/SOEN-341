//https://material-ui.com/getting-started/templates/blog/#

import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import EditAccountPopup from "../edit_account_form";

import {Header, PostFeed, Footer, Post} from '../../index';
import ProfileStats from './ProfileStats';

//Hard coded test images
//TODO link image fetch to db
import pepega from '../../../Images/Pepega.png';
import forever_alone from '../../../Images/forever_alone.jpg';
import meme_man from '../../../Images/meme_man.jpg';
import harold from '../../../Images/harold.jpg';
import pikachu from '../../../Images/shocked pikachu.png';


const useStyles = makeStyles((theme) => ({
    editContainer: {
        margin: "5px"
    },
    mainGrid: {
        marginTop: theme.spacing(3),
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
}));

const sections = [
    { title: 'Please', url: '#' },
    { title: 'Give', url: '#' },
    { title: 'Us', url: '#' },
    { title: 'A', url: '#' },
    { title: 'Good', url: '#' },
    { title: 'Grade', url: '#' },
    { title: 'Because', url: '#' },
    { title: 'We', url: '#' },
    { title: 'Worked', url: '#' },
    { title: 'Hard', url: '#' },
];

//Combine this with backend DB
const post1 =
    <Post
        showActions={false}
        author="Olivier"
        date="2021-02-11"
        title="forever alone"
        imagePath={forever_alone}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    />

const posts = [post1];
    //Gets the user profile to display it on top of page
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    // User's past posts 
    const tileData = [
        {
            img: meme_man,
            title: 'meme man',
            author: user ? user.username : "",
        },
        {
            img: harold,
            title: 'harold',
            author: user ? user.username : "",
        },
        {
            img: pikachu,
            title: 'shocked pikachu',
            author: user ? user.username : "",
        },
        {
            img: pepega,
            title: 'pepega',
            author: user ? user.username : "",
        },
        {
            img: harold,
            title: 'harold',
            author: user ? user.username : "",
        },
        {
            img: pikachu,
            title: 'shocked pikachu',
            author: user ? user.username : "",
        },
    ];

    //const profile = getFromBackend();
    const profile = {
        posts: tileData.length,
        followers: 51289,
        following: 9687
    }

export default function UserProfile(props) {

    const [follows, setFollows] = useState();
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);

    const classes = useStyles();
    let usernameS = {
        currentUsername: "",
        visitedUsername: ""
    };

    // Checking the backend to see if the user is logged in
    if(localStorage.getItem("user") === null || undefined) {
        window.location.assign("/login#redirect");
        //return null;
    }
    else {
        usernameS = {
            currentUsername: JSON.parse(localStorage.getItem("user")).username,
            visitedUsername: window.location.href.split("/")[4]
        };
    }


    //Check if user already follows the other
    useEffect(() => {
        axios.post("http://localhost:5000/api/follow/checkfollow", usernameS)
            .then(res => {
                if (res.data.followersList.includes(usernameS.currentUsername)) {
                    //show unfollow
                    setFollows(true);
                } else {
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
    }, [])

    function handleFollow() {
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

    function handleOpen(){
        setOpen(!open);
    }


    console.log(props.currentUser);
    return !user ? null : (
        <div>
            <CssBaseline/>
            {open ? <EditAccountPopup open={open} onClose={handleOpen}/> : null}
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MemeSpace" sections={sections} currentUser={props.currentUser} />
                <feed>
                    <h1 style={{fontWeight:"550"}}>{window.location.href.split("/")[4]}</h1>
                    <div className="profile-stats">
                        <ProfileStats posts={profile.posts} followers={user.followers.length} following={user.following.length} />
                    </div>
                    <Container>
                        <Button onClick={handleFollow} variant="info">{follows ? "Unfollow" : "Follow"}</Button>
                    </Container>
                    {usernameS.currentUsername === usernameS.visitedUsername ?
                        <Container className={classes.editContainer}>
                            <Button onClick={handleOpen} variant="secondary" >Edit Account</Button>
                        </Container>
                        :
                        null}
                    <Grid container className={classes.mainGrid}>
                        <PostFeed title="Profile Page" posts={posts} />
                    </Grid>

                </feed>
            </Container>
            <Container>
                <br></br>
                <h3>Browse olders memes from {user ? user.username : ""}</h3>

                <div className={classes.root}>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            {/* <ListSubheader component="div">{user.username + "'s"} past memes</ListSubheader> */}
                        </GridListTile>
                        {tileData.map((tile) => (
                            <GridListTile key={tile.img}>
                                <img src={tile.img} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    subtitle={<span>by: {tile.author}</span>}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Container>
            <Footer title="Footer" description="This is a footer"/>
        </div>
    );
}