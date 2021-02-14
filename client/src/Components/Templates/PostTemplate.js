//base template: https://material-ui.com/components/cards/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
});

export default function Post(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="post" className={classes.avatar}>
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
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}