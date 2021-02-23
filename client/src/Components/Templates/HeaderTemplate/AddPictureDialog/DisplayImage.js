import React from 'react';
import ImageUploader from 'react-images-upload';

class DisplayImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        return (

            <ImageUploader
                withIcon={true}
                buttonText='Choose an image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
                withLabel={false}
                singleImage={true}
                name= "UploadedImage"
            />

        );
    }
}

export default DisplayImage;
