//base template: https://material-ui.com/components/cards/

import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";

export default function Post(props) {
    console.log(props)
    return (
        <Card className="post_card">
            <CardHeader
                avatar={
                    <Avatar aria-label="post" className="avatar">
                        user profile picture
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.author}
                subheader={props.date}
            />
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="My brain during exams"
                    height="auto"
                    image={props.imagePath}
                    src={`data:image/${props.fileEncoding};base64, ${props.base64img}`}
                    title="My brain during exams"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.text}
                    </Typography>
                </CardContent>
            </CardActionArea>

            {
                props.showActions ? (
                    <CardActions>
                        <Button size="small" color="primary">
                            Like
                        </Button>
                        <Button size="small" color="primary">
                            Follow
                        </Button>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                    </CardActions>
                ) : null
            }
            
        </Card>
    );
}

Post.defaultProps = {
    showActions : true
}