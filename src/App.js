import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Description from "./Description";
import ImageHolder from "./ImageHolder";
import FormComp from "./FormComp";
import lottie from "lottie-web";

const App = (props) => {
    const container = useRef(null);

    const [uploadedSrc, setUploadedSrc] = useState(""); //state in where we store the local uploaded file's source (blob://); it's empty when nothing is uploaded
    const [uploadedURL, setUploadedURL] = useState(""); //state where we store the url to the dile uploaded in the server.
    const [isCopied, setIsCopied] = useState(false); //to load the lottie animation on button click
    const [copyBtnClass, setcopyBtnClass] = useState("copy") //i only need this to toggle the class "copy-focus" for additional styling
    useEffect(() => {
        var anim = lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: require("./lottie-check.json"),
            name: "lottie-check"
        })
        anim.setSpeed(3);
    }, [isCopied]);

    //gets called on file upload, allows us to get the uploaded file's url
    const getImageURL = (fileURL) => {
        setUploadedSrc((prevURL) => fileURL); //changing the state
    };

    const getUploadedURL = (pathToFile) => {
        var staticURL = "http://localhost:5000/" + pathToFile;
        setUploadedURL(staticURL);
    };

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(uploadedURL);

        setcopyBtnClass("copy copy-focus");
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
            setcopyBtnClass("copy");
        }, 3000);
    };

    if(!isCopied){
        var icon = <i className="fas fa-clipboard"></i> 
        var msg = ''
    }else{
        icon = <div className="lottie" ref={container}></div>
        msg = "Copied";
    }

    if (uploadedURL) {
        var isFileReady = (
            <div className="uploaded">
                <input
                    className="uploaded-url"
                    type="text"
                    readOnly
                    value={uploadedURL}
                />
                <button className={copyBtnClass} onClick={copyToClipBoard}>
                    {icon}
                </button>
                <div className="msg"><em>{msg}</em></div>
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
