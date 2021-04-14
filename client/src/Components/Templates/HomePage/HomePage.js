//https://material-ui.com/getting-started/templates/blog/#

import {React, useState, useEffect, useRef} from 'react';
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

    // Create Date references for filtering posts
    var now = new Date();

    function handleScroll() {
        const scrollTop = window.scrollY;
        if (scrollTop + window.innerHeight >= document.body.offsetHeight){
            console.log("Loading older stuff")

            var forwardLimit = new Date()
            forwardLimit.setDate(forwardLimit.getDate() - 10)
            setLoading(true);
            axios.get("/api/posts/getOlderFeed",{params: { userID: user["_id"] , forwardDateLimit: forwardLimit}})
            .then(res => { 
                // console.log(res.data)
                for(let x = 0; x < res.data.length; x++){
                    // console.log(res.data[x]['date'])
                    let insert = true
                    for (let j = 0; j<posts.length; j++){
                        if (posts[j].props.postID == res.data[x]['postID']){
                            insert = false
                            break;
                        }
                    }

                    if (insert){

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
                }
                setLoading(false);
            }).catch(error => { console.log(error) });   
        }

    }

    useEffect(() => {   


        window.addEventListener('scroll', handleScroll);

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

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    
    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
                <Header title="MemeSpace" sections={sections} />
                <feed>
                    <Grid container className={classes.mainGrid} direction="column">
                        <PostFeed title="The Meme Feed" posts={posts}/>
                    </Grid>
                </feed>
            </Container>
            <Footer title="Footer" description="This is a footer :^)" />
        </div>
    );

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}