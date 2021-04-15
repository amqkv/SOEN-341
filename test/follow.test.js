let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const { expect } = require("chai");

chai.should();
chai.use(chaiHttp);

const sinon = require('sinon');
let sandbox = sinon.createSandbox();

describe("follow API", () => {

    beforeEach(()=>{
        sandbox.stub(process.env, 'DB_CONNECTION').value('fake db');
        sandbox.stub(process.env, 'AWS_ACCESS_KEY_ID').value('fake aws access key');
        sandbox.stub(process.env, 'AWS_SECRET_ACCESS_KEY').value('fake aws secret key');
        sandbox.stub(process.env, 'S3_BUCKET').value('fake bucket');
        sandbox.stub(process.env, 'secretOrKey').value('fake key');
    })

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