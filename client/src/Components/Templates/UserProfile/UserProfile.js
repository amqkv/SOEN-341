//https://material-ui.com/getting-started/templates/blog/#

import { React, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import {Header, PostFeed, Footer, Post} from '../../index';
import ContainedButtons from '../ContainedButtons';
import ProfileStats from './ProfileStats';

//Hard coded test images
//TODO link image fetch to db
import pepega from '../../../Images/Pepega.png';
import forever_alone from '../../../Images/forever_alone.jpg';
import meme_man from '../../../Images/meme_man.jpg';
import harold from '../../../Images/harold.jpg';
import pikachu from '../../../Images/shocked pikachu.png';


const useStyles = makeStyles((theme) => ({
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
    // Checking the backend to see if the user is logged in
    useEffect(() => {
        if(localStorage.getItem("user") === null)
            window.location = "/login#redirect";
    }, [])

    const classes = useStyles();

        // Checking the backend to see if the user is logged in
    useEffect(() => {
        if(localStorage.getItem("user") === null)
            window.location = "/login#redirect";
    }, [])

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MemeSpace" sections={sections} handleUser={props.handleUser} currentUser={props.currentUser} />
                <feed>
                    <h1 style={{fontWeight:"550"}}>{window.location.href.split("/")[4]}</h1>
                    <div className="profile-stats">
                        <ProfileStats posts={profile.posts} followers={profile.followers} following={profile.following} />
                    </div>
                    <Container>
                        <ContainedButtons />
                    </Container>
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

            <Footer title="Footer" description="This is a footer" />
        </div>
    );
}