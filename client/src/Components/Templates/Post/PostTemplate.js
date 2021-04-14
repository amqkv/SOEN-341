//base template: https://material-ui.com/components/cards/

import { React, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
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
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Comments from "./Comments"
import "./PostTemplate.css";

export default function Post(props) {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const user = JSON.parse(localStorage.getItem("user"))
    const useStyles = makeStyles((theme) => ({
          expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
          },
          expandOpen: {
            transform: 'rotate(180deg)',
          },
      }));
      
      const classes = useStyles();

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
                    title={<a className="card_post_author" href={"/UserProfile/" + props.author}>{props.author}</a>}
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
                    <Typography variant="h6" color="textPrimary" component="p" align="left">
                        {props.text}
                    </Typography>
                </CardContent>
            </CardActionArea>

            {
                props.showActions ? (
                    <>
                    <CardActions>
                        <Button size="small" color="default">
                            Like
                        </Button>
                        <Button size="small" 
                            color="default" 
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                            Comments
                            <ExpandMoreIcon className={clsx(classes.expand, {[classes.expandOpen]: expanded})}/>
                        </Button>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Comments postID={props.postID} comments={props.comments}/>
                        </CardContent>
                    </Collapse>
                    </>
                ) : null
            }
            
        </Card>
    );
}

Post.defaultProps = {
    showActions : true
}