import ReactDOM from 'react-dom';
import React from 'react';
import HomePage from "../Components/Templates/HomePage/HomePage";


const request = require('supertest');
const express = require('express');

const app = express();


describe("Load home page", function() {
    const div = document.createElement("home");
    ReactDOM.render(<HomePage/>, div);
});

describe("post feed", function() {
    app.get('/api/post/getFeed', function(req,res) {
        res.status(200).json({})
    });
});