import {React, useReducer, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {fade, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Pepette from "../../../Images/sad_pepette.jpg";
import {BiImageAdd} from "react-icons/bi";
import CreatePost from "./CreatePostForm";
import logo from "../../../Images/Logo.png";
import Form from "react-bootstrap/Form";


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
    iconButton: {
        padding: 10,
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
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));



export default function Header(props) {

    const [searchInput, setSearchInput] = useState("");
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const state =  {
        results: [],
        term: '',
    };




    const sections = [
        { title: 'Please', url: '#' },
        { title: 'Give', url: '#' },
        { title: 'Us', url: '#' },
        { title: 'A', url: '#' },
        { title: 'Good', url: '#' },
        { title: 'Grade', url: '#' },
        { title: 'Because', url: '#' },
        { title: 'We', url: '#' },
        { title: 'Worked', url: '#' },
        { title: 'Hard', url: '#' },
    ];

    const user = JSON.parse(localStorage.getItem("user"));

    function login_logout(){
        if(localStorage.getItem("user") != null){
            localStorage.clear();
        }
        window.location = "/login";
    }


    function handleCreate(){
        setOpen(!open);
    }

    function handleSearch(e) {
        e.preventDefault()
        console.log(searchInput);
        window.location = "/Search/" + searchInput;
    }
    function handleChange(e) {
        const {name, value} = e.target;
        setSearchInput(value);
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

                <Form class="form-group" component="form" className={classes.root}>
                    <Form.Group>
                        <Form.Control
                            class="form-group"
                            type="text"
                            className={classes.input}
                            id="searchInput"
                            onChange={handleChange}
                            name="searchInput">
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={handleSearch}  type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </Button>
                </Form>

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


