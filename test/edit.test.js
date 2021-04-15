let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const { expect } = require("chai");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

chai.should();
chai.use(chaiHttp);

const envPath = './../.env-mock';
require('dotenv').config({path:envPath});

describe("edit API", () => {
    // Testing the editEmail endpoint
    describe("edit email request", () => {
        describe("when the correct password is entered", () => {
            it("should change the email in the database and return a success", (done) => {
                chai.request(server)
                    .post("/api/edit/editEmail")
                    .send({ newEmail: "editedemail@gmail.com", password: "asdasdasd", username: "dummy_c" })
                    .end((err, res) => {
                        if(err)
                            console.log(err);
                        res.should.have.status(200);
                        expect(res.body.success).to.not.be.null;
                        User.findOne({username: "dummy_c"}).then(user => {
                            expect(user.email).to.equal("editedemail@gmail.com")
                        })
                        // Changing the email back to the old one
                        User.updateOne({email: "editedemail@gmail.com"}, { email: "dummyc@gmail.com" }, {upsert: true}, (err, results) => {
                            if(err)
                                console.log(err);
                        })
                        done()
                    })
            })
        })
        describe("when a wrong password is entered", () => {
            it("should not change anything and return an error", (done) => {
                chai.request(server)
                    .post("/api/edit/editEmail")
                    .send({ newEmail: "editedemail@gmail.com", password: "a_wrong_password", username: "dummy_c" })
                    .end((err, res) => {
                        if(err)
                            console.log(err);
                        res.should.have.status(200);
                        expect(res.body.error).to.not.be.null;
                        User.findOne({username: "dummy_c"}).then(user => {
                            expect(user.email).to.equal("dummyc@gmail.com")
                        })
                        done()
                    })
            })
        })
    })

    describe("edit password request", () => {
        describe("when the correct password is entered", () => {
            it("should change the user's password and return a success", (done) => {
                chai.request(server)
                    .post("/api/edit/editPassword")
                    .send({ username: "dummy_c", oldPassword: "asdasdasd", newPassword: "new_password" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        expect(res.body.success).to.not.be.null;
                        User.findOne({ username: "dummy_c" }).then(user => {
                            bcrypt.compare("new_password", user.password).then(isMatch => {
                                expect(isMatch).to.be.true;
                            })
                        })
                        // Changing the password back to the old one
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash("asdasdasd", salt, (err, hashedPassword) => {
                                if(err) throw err;
                                User.updateOne({ "username": "dummy_c" }, { "password": hashedPassword }, {upsert: true}, (error, results) => {
                                     if(err) 
                                        console.log(err);
                                })
                            })
                        })
                        done();
                    })
            })
        });

        describe("when an incorrect password is entered", () => {
            it("should not change the user's password and return an error", (done) => {
                chai.request(server)
                .post("/api/edit/editPassword")
                .send({ username: "dummy_c", oldPassword: "asdasdasd", newPassword: "new_password" })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.error).to.not.be.null;
                    User.findOne({ username: "dummy_c" }).then(user => {
                        bcrypt.compare("asdasdasd", user.password).then(isMatch => {
                            expect(isMatch).to.be.true;
                        })
                    })
                    done();
                })
            })
        })
    })

})