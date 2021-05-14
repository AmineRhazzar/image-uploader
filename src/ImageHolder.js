import React from "react";
import { ReactComponent as ImageSVG } from "./image.svg";

const ImageHolder = (props) => {

    
    if (props.uploadedSrc) {
        var imageComponent = (
            <img className="uploaded-img" src={props.uploadedSrc} alt="" />
        );
    } else {
        if(props.isDragged){
            var useSvg = <i className="fas fa-cloud-upload-alt" id="cloud"></i>
        }else{
            useSvg = <ImageSVG className="image-svg" />
        }

        imageComponent = (
            <>
                {useSvg}
                <p>Drag and drop your image here</p>
            </>
        );
    }
    return <div className="image-holder">{imageComponent}</div>;
};

export default ImageHolder;
