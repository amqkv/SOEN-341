import { React, useState } from 'react';
import PropTypes from 'prop-types';
import {fade, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Pepette from "../../../Images/sad_pepette.jpg";
import {BiImageAdd} from "react-icons/bi";
import CreatePost from "../test_create_post_form";
import logo from "../../../Images/Logo.png";
import {FormControl, InputBase} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";


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
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



export default function Header(props) {

    const classes = useStyles();
    const { sections, title } = props;
    const [open, setOpen] = useState(false);
    const state =  {
        results: [],
        term: '',
    };




    const user = JSON.parse(localStorage.getItem("user"));

    function login_logout(){
        if(localStorage.getItem("user") != null){
            localStorage.clear();
        }
        window.location = "/login";
    }

    const onChange = (event) => {
        console.log(event.target.value);
    };

    const onSubmit = (event) => {
        console.log("HELLO FROM SUBMIT",event.target.value);
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

                <FormControl onSubmit={onSubmit}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <IconButton type="submit">
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={onChange}
                        />
                    </div>
                </FormControl>

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


