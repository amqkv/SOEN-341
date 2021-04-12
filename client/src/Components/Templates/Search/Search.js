import { React, useState, useEffect } from 'react';


import axios from "axios";
import UserDisplay from "./UserDisplay"
import {Container} from "@material-ui/core";
import {Header} from "../../index";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Footer from "../Footer/Footer";


export default function Search(props) {

    const [userDisplays, setUserDisplays] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [users, setUsers] = useState([]);


    const mockSearchQuery = [
        "demo",
        "pooja.god",
        "mememan2",
        "sitetester",
        "tes555",
        'sadasdasda',
        'testing',
        'testtest',
        'testesttest',
        'atestsetset',
        'oopopopopop',
        'asdasdasdasdas',
        'asdasdasdas',
        'sadasdasda',
        'lakjsdlkasjdklj',
        'kajshdkashd',
        'asdasdas',
    ];


    const sections = [
        {title: 'Please', url: '#'},
        {title: 'Give', url: '#'},
        {title: 'Us', url: '#'},
        {title: 'A', url: '#'},
        {title: 'Good', url: '#'},
        {title: 'Grade', url: '#'},
        {title: 'Because', url: '#'},
        {title: 'We', url: '#'},
        {title: 'Worked', url: '#'},
        {title: 'Hard', url: '#'},
    ];

    const query = {
        currentUsername: JSON.parse(localStorage.getItem("user")).username,
        visitedUsername: window.location.href.split("/")[4]
    };


    // Checking the backend to see if the user is logged in
    useEffect(() => {
        if (localStorage.getItem("user") === null)
            window.location.assign("/login#redirect");
    }, [])

    const queryEndpoint = "http://localhost:5000/api/search/search";


    const filterSearch =
        mockSearchQuery.filter(users => {
            return users.includes(query.visitedUsername.toLowerCase())
        })


    /*async function getUsers() {
        axios.get(queryEndpoint)
            .then(res => {
                for(let x = 0; x < res.data.length; x++) {
                    users.push(res.data[x].username)
                }
            })
        return users
    }*/

    useEffect(() => {
        setUserDisplays(filterSearch);
    });





    const noResults = <Container>
        <Header title="MemeSpace" sections={sections} currentUser={props.currentUser} />
        <h2> No results found...</h2>
        <Footer title="Footer" description="This is a footer :^)" />
    </Container>;


    const searchDisplay =  <Container>
        <Header title="MemeSpace" sections={sections} currentUser={props.currentUser} />
        <Container style={{paddingTop: "50px"}}>
            <Grid  md="auto" container justify="space-around"  spacing={12} direction="column" alignItems="center">
                <Divider />
                {userDisplays.map(userDisplay => {
                    return(
                        <UserDisplay
                            username={userDisplay} />
                    )
                })}
            </Grid>
        </Container>
        <Footer title="Footer" description="This is a footer :^)" />
    </Container>;

    return ((userDisplays.length !== 0) ? searchDisplay : noResults)
}
