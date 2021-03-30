import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Post from "../Post/PostTemplate";

export default function ProfilePostPopup(props){

    const { onClose, selectedValue, open } = props;
    const post = props.post;
    // Function handling the closing of the dialog box (popup)
    const handleClose = () => {
      onClose(selectedValue);
    };

    return(
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Post 
          width="500px" 
          author={post.username} 
          date={post.date} 
          base64img={post.image.file} 
          fileEncoding={post.image.encoding} 
          text={post.description} 
          postID={post.postID} 
          comments={post.comments} 
          showActions={true}
/>
      </Dialog>
    );
}