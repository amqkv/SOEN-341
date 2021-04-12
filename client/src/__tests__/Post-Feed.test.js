import ReactDOM from 'react-dom';
import React from 'react';
import HomePage from "../Components/Templates/HomePage/HomePage";
import {mockComponent} from "react-dom/test-utils";


const request = require('supertest');
const express = require('express');
const userData = require('./user.json');


const app = express();

describe("post feed request", () => {
    it("make a request to get the feed" , () => {
        app.get('/api/post/getFeed', function (req, res) {
            console.log(res.get('status'));
            expect(res.get('status') === 200);
        });
    });
});