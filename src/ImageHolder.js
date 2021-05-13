import React from "react";
import { ReactComponent as ImageSVG } from "./image.svg";

const ImageHolder = (props) => {
    if (props.uploadedSrc) {
        var imageComponent = (
            <img className="uploaded-img" src={props.uploadedSrc} alt="" />
        );
    } else {
        imageComponent = (
            <>
                <ImageSVG className="image-svg" />
                <p>Drag and drop your image here</p>
            </>
        );
    }
    return <div className="image-holder">{imageComponent}</div>;
};

export default ImageHolder;
