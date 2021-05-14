import React, { useState } from "react";
import "./index.css";
import Description from "./Description";
import ImageHolder from "./ImageHolder";
import FormComp from "./FormComp";


const App = (props) => {
    const [uploadedSrc, setUploadedSrc] = useState(""); //state in where we store the local uploaded file's source (blob://); it's empty when nothing is uploaded
    const [uploadedURL, setUploadedURL] = useState(""); //state where we store the url to the dile uploaded in the server.

    //gets called on file upload, allows us to get the uploaded file's url
    const getImageURL = (fileURL) => {
        setUploadedSrc((prevURL) => fileURL); //changing the state
    };

    const getUploadedURL = (pathToFile) => {
        var staticURL = "http://localhost:5000/" + pathToFile;
        setUploadedURL(staticURL);
    };

    const changeIcon = () => {};

    if (uploadedURL) {
        var isFileReady = (
            <div className="uploaded">
                <input
                    className="uploaded-url"
                    type="text"
                    readOnly
                    value={uploadedURL}
                />
                <button className="copy" id="copy" onClick={changeIcon}>
                    <i className="fas fa-clipboard"></i>
                </button>
            </div>
        );
    } else {
        isFileReady = (
            <FormComp
                getImageURL={getImageURL}
                getUploadedURL={getUploadedURL}
            />
        );
    }

    return (
        <>
            <Description />
            <ImageHolder uploadedSrc={uploadedSrc} />
            {isFileReady}
        </>
    );
};

export default App;
