import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Pepette from "../../../Images/sad_pepette.jpg";
import {BiImageAdd} from "react-icons/bi";
import CreatePost from "../test_create_post_form";
import logo from "../../../Images/Logo.png";


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
    addImageBtn:{
        padding: "3px",
        height: "35px",
        minWidth: "0px",
        width: "35px"
    },
    biImageAdd:{
        height: "27px",
        width: "27px",
        color:"rgba(0, 0, 0, 0.6)"
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const { sections, title } = props;
    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    
    function login_logout(){
        if(localStorage.getItem("user") != null){
            localStorage.clear();
        }
        window.location.assign("/login");
    }

    function handleCreate(){
        setOpen(!open);
    }


    return (
        <div id="Header">
            {open ? <CreatePost open={open} onClose={handleCreate}/> : null}
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
                <a href="/Home" style={{textDecoration: "none", color: "#343a40"}}><img width="250px" style={{paddingTop:"10px", marginLeft:"90px"}} src={logo} alt={props}/></a>
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button variant="outlined" size="small" onClick={login_logout}>
                    {localStorage.getItem("user") === null ? "Login" : "Logout"}
                </Button>
                {user ? 
                    <a href={"/UserProfile/" + user.username}>
                        <img alt="header_profile_picture" src={Pepette} width="35px" height="35px" style={{ borderRadius: "50%", margin: "5px" }} />
                    </a>
                    : null
                }
                <Button className={classes.addImageBtn} onClick={handleCreate}>
                    <BiImageAdd className={classes.biImageAdd}/>
                </Button>
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
        </div>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};

function yeetToGIT(){
    window.open('https://github.com/amqkv/SOEN-341', "_blank");
}


