let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const { expect } = require("chai");

chai.should();
chai.use(chaiHttp);

const dotenv = require('dotenv');
dotenv.config({path: './../../.env-mock'});

const sinon = require('sinon');
let sandbox = sinon.createSandbox();

describe("posts API", () => {
    describe("when fetching a specific user's posts", () =>{

        beforeEach(()=>{
            console.log(process.env.S3_BUCKET)
            sandbox.stub(process.env, 'S3_BUCKET').value('test-bucket');
            console.log(process.env.S3_BUCKET)
        })

        // Testing the getUserPosts endpoint
        it("should return an array of posts made by that user only", (done) => {
                chai.request(server)
                    .post("/api/posts/getUserPosts")
                    .send({username: "pooja.god"}) 
                    .end((err, response) => {
                        if(err)
                            console.log(err);
                        response.should.have.status(200);
                        let isMadeByUser = true;
                        for(let i = 0; i < response.body.length; i++){
                            if(!response.body[i].username === "pooja.god"){
                                isMadeByUser = false;
                            }
                        }
                        expect(isMadeByUser).to.be.true;
                        done();
            })
        })
    })
})