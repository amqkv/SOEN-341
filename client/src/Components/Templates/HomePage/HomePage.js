//https://material-ui.com/getting-started/templates/blog/#

import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Post, Header, PostFeed, Footer} from '../../../Components/index';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
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
export default function HomePage(props) {

    const [isLoading, setLoading] = useState(true);
    const [posts,setPosts] = useState([]);
    const user = JSON.parse(localStorage.user)
    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState(false);
    // Create Date references for filtering posts
    var now = new Date();
    


    useEffect(() => {   
        axios.get("/api/posts/getFeed",{params: { userID: user["_id"] , forwardDateLimit: new Date()}})
        .then(res => { 
            // console.log(res.data)
            for(let x = 0; x < res.data.length; x++){
                // console.log(res.data[x]['date'])
                posts.push(<Post 
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
        
    }, []);

    useEffect(() => {
        if(window.location.href.includes("#"))
            setOpenAlert(true);
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    
    return (
        <div>
            {openAlert ? 
                <div className={classes.root}>
                    <Alert severity="error" onClose={() => {setOpenAlert(false)}}>That user does not exist!</Alert>
                </div>
                :
                null
            }

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