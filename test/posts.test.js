let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const posts = require("../routes/api/posts");
const { expect } = require("chai");

chai.should();
chai.use(chaiHttp);

const sinon = require('sinon');
let sandbox = sinon.createSandbox();

describe("posts API", () => {
    describe("when fetching a specific user's posts", () =>{

        beforeEach(()=>{
            sandbox.mock(posts)
        })

        // Testing the getUserPosts endpoint
        it('useless test', () => console.log("called"))
        if(false) {
            it("should return an array of posts made by that user only", (done) => {
                chai.request(server)
                    .post("/api/posts/getUserPosts")
                    .send({username: "pooja.god"})
                    .end((err, response) => {
                        if (err)
                            console.log(err);
                        response.should.have.status(200);
                        let isMadeByUser = true;
                        for (let i = 0; i < response.body.length; i++) {
                            if (!response.body[i].username === "pooja.god") {
                                isMadeByUser = false;
                            }
                        }
                        expect(isMadeByUser).to.be.true;
                        done();
                    })
            })
        }
    })
})