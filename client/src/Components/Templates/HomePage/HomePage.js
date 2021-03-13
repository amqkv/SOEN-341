//https://material-ui.com/getting-started/templates/blog/#

import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Post, Header, PostFeed, Footer} from '../../../Components/index';
import axios from 'axios';

//Hard coded test images
//TODO link image fetch to db
import pepega from '../../../Images/Pepega.png';
import pikachu from '../../../Images/shocked pikachu.png';
import videotron from '../../../Images/videotron.png'


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
// var posts = [];
const comments = [
    {postID: "60382688d9913406bdebb18b", commentID: 1, author: "pooja.god", content: "i cri", date: "30-02-1932"},
    {postID: "60382688d9913406bdebb18b", commentID: 2, author: "sitetester", content: "testing", date: "12-01-3052"},
    {postID: "60382688d9913406bdebb18b", commentID: 3, author: "demodemo", content: "pls", date: " 06-12-5123"},
    {postID: "60382688d9913406bdebb18b", commentID: 4, author: "mouchou", content: "work", date: "30-02-632 BC"},
    {postID: "60382688d9913406bdebb18b", commentID: 5, author: "asdasdasd", content: "thx", date: "31-05-2020"},
]
const post1 = <Post
postID="60382688d9913406bdebb18b"
author="Olivier"
date="2021-02-12"
title="Videotron"
imagePath={videotron}
text="Haha internet problems on quiz time goes brrrrr"
comments={comments}
/>

const post2 = <Post
postID="602b2fc542b5d081b909c466"
author="Olivier"
date="2021-02-11"
title="Pepega"
imagePath={pepega}
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
/>

const post3 = <Post
postID="602b2f9242b5d081b909c465"
author="Olivier"
date="2021-02-11"
title="Surprised Pikachu"
imagePath={pikachu}
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
/>



export default function HomePage(props) {

    const [isLoading, setLoading] = useState(true);
    const [posts,setPosts] = useState([post1,post2,post3]);

    const classes = useStyles();
    useEffect(() => {
                    
        axios.get("/api/posts/getLatestPost", {params: { userID: "ID of the currently logged in user" }})
        .then(res => { 
            console.log(res)
            let temp = <Post
                        author={ res.data['ownerID'] }
                        date={ res.data['date'] }
                        title="hey"
                        base64img={res.data['image']['file']}
                        fileEncoding={res.data['image']['encoding']}
                        text={ res.data['description']}
                        postID={ res.data['postID'] }
                        />

            posts.push(temp)
            setLoading(false);
            
        }).catch(error => { console.log(error.response) });
        
      }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MemeSpace" sections={sections} />
                <feed>
                    <Grid container className={classes.mainGrid} direction="column">
                        <PostFeed title="The Meme Feed" posts={posts} />
                    </Grid>
                </feed>
            </Container>
            <Footer title="Footer" description="This is a footer :^)" />
        </div>
    );
}