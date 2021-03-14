import { React, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import "./PostTemplate.scss";
import Button from 'react-bootstrap/Button';
import axios from "axios";

export default function Comments(props){
    const [comment, setComment] = useState("");
    const [commentArr, setCommentArr] = useState(props.comments);

    // Storing the comment value in the state
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

                // Formatting the date
                let date = new Date();
                let month = (date.getMonth()+1) < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
                setCommentArr([...commentArr, {postID: props.postID, author: JSON.parse(localStorage.getItem("user")).username, content: comment, date: (date.getFullYear() + "-" + month + "-" + date.getDate())}])
                
                // Resetting the comment input field
                document.getElementById("comment_form_" + props.postID).reset();
                setComment("");
            })
            .catch(error => console.log(error))
    }
    return(
        <div id="Comments">
            <div className="postedComments">
            {/* Mapping the comment array */}
            {(commentArr).map(comment => 
                <div className="comment-container">
                    <a className="comment-author" href={"/UserProfile/" + comment.author}>{comment.author}</a> &nbsp;
                    <span className="comment-content">{comment.content}</span><br/>
                    <span className="comment-date">{comment.date.substring(8, 10) + "-" + comment.date.substring(5, 8) + comment.date.substring(0, 4)}</span>
                </div>
            )}
            </div>
            {/* Comment input form */}
            <Form id={"comment_form_" + props.postID}>
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