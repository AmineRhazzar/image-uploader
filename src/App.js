import React, { useState } from "react";
import "./index.css";
import Description from "./Description";
import ImageHolder from "./ImageHolder";
import FormComp from "./FormComp";
const App = (props) => {
    const [uploadedSrc, setUploadedSrc] = useState(""); //state in where we store the uploaded file's url; it's empty when nothing is uploaded

    //this method allows us to open the file explorer using the custom button and not input type=file


    //gets called on file upload, allows us to get the uploaded file's url
    const getImageURL = (fileURL) => {
        setUploadedSrc((prevURL) => fileURL); //changing the state
    };

    return (
        <>
            <Description />
            <ImageHolder uploadedSrc={uploadedSrc} />
            <FormComp getImageURL={getImageURL} />
        </>
    );
};

export default App;
