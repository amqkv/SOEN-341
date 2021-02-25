import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Pepette from "../../../Images/sad_pepette.jpg";


const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const { sections, title } = props;
    const user = JSON.parse(localStorage.getItem("user"));
    function login_logout(){
        if(localStorage.getItem("user") != null){
            props.handleUser(null);
            localStorage.clear();
        }
        window.location = "/login";
    }

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <Button size="small" onClick={yeetToGIT}>The Github Repo</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                <a href="/Home" style={{textDecoration: "none", color: "#343a40"}}>{title}</a>
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button variant="outlined" size="small" onClick={login_logout}>
                    {localStorage.getItem("user") === null ? "Login" : "Logout"}
                </Button>
                <a href={"/UserProfile/" + user.username}>
                    <img alt="header_profile_picture" src={Pepette} width="35px" height="35px" style={{ borderRadius: "50%", margin: "5px" }} />
                </a>
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        className={classes.toolbarLink}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};

function yeetToGIT(){
    window.open('https://github.com/amqkv/SOEN-341', "_blank");
}


