import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import "./PostTemplate.scss";
import Button from 'react-bootstrap/Button';
import axios from "axios";


export default function Comments(props){
    const [comment, setComment] = useState("");

    // Fetch the comments here
    const comments= props.comments || [];
    function handleChange(e){
        const { name, value } = e.target;
        console.log(comment)

        if(name ==="commentContent"){
            setComment(value);
        }
    }

    function handleSubmit(e){
        console.log("handleSubmit")
        axios.post("http://localhost:5000/api/comments/comments", { author: JSON.parse(localStorage.getItem("user")).username, content: comment, postID: props.postID })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => console.log(error))
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
                        <Button className="submitCommentBtn" variant="info" size="sm" onClick={handleSubmit} disabled={comment.length === 0 ? true : false}>Comment</Button>
                    </Form.Group>
                </Form>

        </div>

    )
}