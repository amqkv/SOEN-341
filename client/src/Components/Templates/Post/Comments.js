import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import "./PostTemplate.scss";
import Button from 'react-bootstrap/Button';



export default function Comments(props){
    const [comment, setComment] = useState("");

    // Fetch the comments here
    const comments=[
        {postID: 1, commentID: 1, author: "pooja.god", content: "i cri", date: "30-02-1932"},
        {postID: 1, commentID: 2, author: "sitetester", content: "testing", date: "12-01-3052"},
        {postID: 1, commentID: 3, author: "demodemo", content: "pls", date: " 06-12-5123"},
        {postID: 1, commentID: 4, author: "mouchou", content: "work", date: "30-02-632 BC"},
        {postID: 1, commentID: 5, author: "asdasdasd", content: "thx", date: "31-05-2020"},
    ]
    
    function handleChange(e){
        const { name, value } = e.target;
        if(name ==="commentContent"){
            setComment(value);
        }
        else if(name === "clearCommentBtn"){
            console.log("clear btn")
            document.getElementById("comment_form").reset();
            setComment("");
        }
        console.log(comment)
    }

    return(
        <div id="Comments">
            <div className="postedComments">
            {comments.map(comment => 
                <div className="comment-container">
                    <a className="comment-author" href={"/UserProfile/" + comment.author}>{comment.author}</a> &nbsp;
                    <span className="comment-content">{comment.content}</span><br/>
                    <span className="comment-date">{comment.date}</span>
                </div>
            )}
            </div>
                <Form id="comment_form">
                    <Form.Group>
                        <Form.Control 
                            className="commentInput"
                            name="commentContent"
                            onChange={handleChange} 
                            type="text" 
                            placeholder="Write a comment..."
                            required
                        />
                        <Button className="submitCommentBtn" variant="info" size="sm" onCLick={handleChange} disabled={comment.length === 0 ? true : false}>Comment</Button>
                        <Button name="clearCommentBtn" className="clearCommentBtn" variant="light" size="sm" onClick={handleChange} disabled={comment.length === 0 ? true : false}>Cancel</Button>
                    </Form.Group>
                </Form>

        </div>

    )
}