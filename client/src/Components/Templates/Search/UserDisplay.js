import React from 'react';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import Card from "@material-ui/core/Card";
import "./Search.css"


export default function UserDisplay(props) {

    return (
        <Card style={{minWidth: "300px"}}>
            <CardHeader
                avatar={
                    <Avatar aria-label="post" className="avatar">
                        P
                    </Avatar>
                }
                title={<a className="card_post_author" href={"/UserProfile/" + props.username}>{props.username}</a>}
            />
        </Card>
    )
}
