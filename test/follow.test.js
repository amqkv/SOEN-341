let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const { expect } = require("chai");

chai.should();
chai.use(chaiHttp);

describe("follow API", () => {

    // Test the checkfollow
    describe("check follow request", () => {
        it("should return an object containing followers and following lists of dummy_b", (done) => {
            chai.request(server)
                .post("/api/follow/checkfollow")
                .send({currentUsername: "dummy_a", visitedUsername: "dummy_b"}) 
                .end((err, response) => {
                    if(err)
                        console.log(err);
                    response.should.have.status(200);
                    // response.body.should.be.a('array')
                    expect(response.body.followingList).that.does.not.include("dummy_a");
                    expect(response.body.followersList).that.includes("dummy_a");
                    done();
                })
        })
    })
});