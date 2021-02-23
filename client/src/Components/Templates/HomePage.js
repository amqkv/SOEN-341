//https://material-ui.com/getting-started/templates/blog/#

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './HeaderTemplate/Header';
import Main from './Main';
import Footer from './FooterTemplate/Footer';

import Post from './PostsTemplate/PostTemplate';
//Hard coded test images
//TODO link image fetch to db
import pepega from '../../Images/Pepega.png';
import pikachu from '../../Images/shocked pikachu.png';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
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
const post1 = <Post
    author="Olivier"
    date="2021-02-11"
    title="Pepega"
    imagePath={pepega}
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
/>

const post2 = <Post
    author="Olivier"
    date="2021-02-11"
    title="Surprised Pikachu"
    imagePath={pikachu}
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
/>
const posts = [post1, post2];



export default function HomePage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MemeSpace" sections={sections} />
                <main>
                    <Grid container className={classes.mainGrid}>
                        <Main title="The Meme Feed" posts={posts} />
                    </Grid>
                </main>
            </Container>
            <Footer title="Footer" description="This is a footer" />
        </React.Fragment>
    );
}
