//https://material-ui.com/getting-started/templates/blog/#

import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Post, Header, PostFeed, Footer} from '../../../Components/index';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));


//Combine this with backend DB
export default function HomePage(props) {

    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.user)
    const classes = useStyles();

    useEffect(() => {   
        axios.get("/api/posts/getFeed",{params: { userID: user["_id"] , forwardDateLimit: new Date()}})
        .then(res => { 
            for(let x = 0; x < res.data.length; x++){
                posts.push(<Post 
                        width="600px"
                        height="700px"
                        author={ res.data[x]['username'] }
                        date={ res.data[x]['date'] }
                        base64img={res.data[x]['image']['file']}
                        fileEncoding={res.data[x]['image']['encoding']}
                        text={ res.data[x]['description']}
                        postID={ res.data[x]['postID'] }
                        comments={ res.data[x]['comments'] } />
                    )
            }
            setLoading(false);
            
        }).catch(error => { console.log(error) });
        
      }, [posts, user]);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MemeSpace" />
                    <Grid container className={classes.mainGrid} direction="column">
                        <PostFeed title="The Meme Feed" posts={posts} />
                    </Grid>
            </Container>
            <Footer title="Footer" description="This is a footer :^)" />
        </div>
    );
}