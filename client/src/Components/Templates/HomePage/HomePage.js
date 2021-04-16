//https://material-ui.com/getting-started/templates/blog/#

import {React, useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Post, Header, PostFeed, Footer} from '../../../Components/index';
import axios from 'axios';
import './style.css';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
          textAlign: "center"
        },
    },
}));


//Combine this with backend DB
export default function HomePage(props) {

    const [isLoading, setLoading] = useState(true);
    const [loaderDisplay, setLoaderDisplay] = useState("None")
    const [current_posts,setCurrentPosts] = useState([]);
    let user = null;
    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState(false);

    // Create Date references for filtering posts
    var now = new Date();
    var updated_posts = []

    function findOldestDate() {
        let oldestDate = new Date()
        for(let x = 0; x < current_posts.length; x++){
            let entry = new Date(current_posts[x]['props']['date'])
            if (entry < oldestDate){
                oldestDate = entry
            }
        }
        return oldestDate
    }
    function handleScroll() {

        const scrollTop = window.scrollY;
        if (scrollTop + window.innerHeight >= document.body.offsetHeight && loaderDisplay == "None"){


            setLoaderDisplay("block")
            var forwardLimit = findOldestDate()

            setCurrentPosts(current_posts);

            axios.get("/api/posts/getOlderFeed",{params: { userID: user["_id"] , forwardDateLimit: forwardLimit}})
            .then(res => {

                for(let x = 0; x < res.data.length; x++){

                    let insert = true
                    for (let j = 0; j<current_posts.length; j++){
                        if (current_posts[j].props.postID == res.data[x]['postID']){
                            insert = false
                            break;
                        }
                    }

                    if (insert){
                        current_posts.push(<Post
                            author={ res.data[x]['username'] }
                            date={ res.data[x]['date'] }
                            base64img={res.data[x]['image']['file']}
                            fileEncoding={res.data[x]['image']['encoding']}
                            text={ res.data[x]['description']}
                            postID={ res.data[x]['postID'] }
                            comments={ res.data[x]['comments'] } />
                        )

                    }

                }
                setCurrentPosts(current_posts);
                setLoaderDisplay("None");
            }).catch(error => { console.log(error) });
        }
    }



    // Checking the backend to see if the user is logged in
    if(localStorage.getItem("user") === null || undefined) {
        window.location.assign("/login#redirect");
        //return null;
    }
    else {
        user = JSON.parse(localStorage.user)
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setLoading(true);
        if(user !== null) {
            axios.get("/api/posts/getFeed", {params: {userID: user["_id"], forwardDateLimit: new Date()}})
                .then(res => {
                    for (let x = 0; x < res.data.length; x++) {
                        current_posts.push(<Post
                            width="600px"
                            height="700px"
                            author={res.data[x]['username']}
                            date={res.data[x]['date']}
                            base64img={res.data[x]['image']['file']}
                            fileEncoding={res.data[x]['image']['encoding']}
                            text={res.data[x]['description']}
                            postID={res.data[x]['postID']}
                            comments={res.data[x]['comments']}/>
                        )
                    }
                    setLoading(false);

                }).catch(error => {
                console.log(error)
            });

        }}, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MemeSpace" />
                    <Grid container className={classes.mainGrid} direction="column">
                        <PostFeed title="The Meme Feed" posts={current_posts}/>
                    </Grid>
            </Container>
            <div class="loader" style={{display: loaderDisplay }}/>
            <Footer title="Footer" description="This is a footer :^)" />
        </div>
    );
}