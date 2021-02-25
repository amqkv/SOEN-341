import React from 'react';
import './style.css';

export default function profileStats(props) {
    return (
        <div id="mainBox">
            <div id="leftBox">Posts: {props.posts}</div>
            <div id="middleBox">Followers: {props.followers}</div>
            <div id="rightBox">Following: {props.following}</div>
        </div>
    );
}