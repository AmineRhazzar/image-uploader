import React, { useState } from "react";
import "./index.css";
import Description from "./Description";
import ImageHolder from "./ImageHolder";
const App = (props) => {
    const [uploadedSrc, setUploadedSrc] = useState(""); //state in where we store the uploaded file's url; it's empty when nothing is uploaded

    //this method allows us to open the file explorer using the custom button and not input type=file
    const openFileExplorer = () => {
        document.getElementById("file-uploader").click();
    };

    //gets called on file upload, allows us to get the uploaded file's url
    const getImageURL = (e) => {
        setUploadedSrc((prevURL) => URL.createObjectURL(e.target.files[0])); //changing the state
    };

    return (
        <>
            <Description />
            <ImageHolder uploadedURL={uploadedSrc} />
            <p>Or</p>
            <button className="file-btn" onClick={openFileExplorer}>
                Choose A File
            </button>
            <input
                hidden
                id="file-uploader"
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                onChange={getImageURL}
            />
        </>
    );
};

export default App;
