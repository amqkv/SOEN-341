import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


export default function PostFeed(props) {
    const {posts} = props;



    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
            {/* <img src={logo} alt={title}/> */}
            <Divider />
            {posts.map((post) => (
                <Grid item xs={12} sm={6} justify="center">
                    {post}
                </Grid>
            ))}
        </Grid>
    );
}

PostFeed.propTypes = {
    posts: PropTypes.array,
    title: PropTypes.string
};