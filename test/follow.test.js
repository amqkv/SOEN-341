let chai = require("chai");
let chaiHttp = require("chai-http");

let proxyquire = require('proxyquire')
    , pathStub = { };
let server = proxyquire('../server', {'posts': pathStub});
//let server = require("../server");

const posts = require("../routes/api/posts");
const { expect } = require("chai");

chai.should();
chai.use(chaiHttp);


describe("follow API", () => {

    pathStub.posts = {};

    // Testing the checkfollow endpoint
    describe("check follow request", () => {
        it("should return an object containing followers and following lists of dummy_b", (done) => {
            chai.request(server)
                .post("/api/follow/checkfollow")
                .send({currentUsername: "dummy_a", visitedUsername: "dummy_b"}) 
                .end((err, response) => {
                    if(err)
                        console.log(err);
                    response.should.have.status(200);
                    expect(response.body.followingList).that.does.not.include("dummy_a");
                    expect(response.body.followersList).that.includes("dummy_a");
                    done();
                })
        })
    })
});