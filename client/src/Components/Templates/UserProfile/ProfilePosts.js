import { React, useState } from 'react';
import Container from '@material-ui/core/Container';
import PostTemplate from "../Post/PostTemplate";
import Grid from '@material-ui/core/Grid';

export default function ProfilePosts(props){
    const [posts, setPosts] = useState(props.posts);

    console.log(posts.length)
    return(
        <Container>
            {posts.map(post => {
                <Grid item xs={12} sm={6} justify="center">
                    {post}
                </Grid>
            })}
        </Container>
    )
}