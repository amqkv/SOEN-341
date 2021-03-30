import React from 'react';
import './style.css';

export default function profileStats(props) {
    const user = props.user;
    const posts = props.posts;
    return (
        <div id="mainBox">
            <div id="leftBox">Posts: {posts.length || 0}</div>
            <div id="middleBox">Followers: {user.followers.length}</div>
            <div id="rightBox">Following: {user.following.length}</div>
        </div>
    );
}