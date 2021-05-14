import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Description from "./Description";
import ImageHolder from "./ImageHolder";
import FormComp from "./FormComp";
import lottie from "lottie-web";

const App = (props) => {
    const container = useRef(null);

    const [uploadedSrc, setUploadedSrc] = useState(""); //state in where we store the file's temporary local source (blob://); it's empty when nothing is uploaded
    const [uploadedURL, setUploadedURL] = useState(""); //state where we store the url to the file uploaded in the server.
    const [isCopied, setIsCopied] = useState(false); //to load the lottie animation on button click
    const [copyBtnClass, setcopyBtnClass] = useState("copy") //i only need this to toggle the class "copy-focus" for additional styling
    const [isDragged, setIsDragged] = useState(false); //communicate the photo being dragged from the form to the imageHolder component

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
        }, 1500);
    };

    const isDraggedHandler = (boolState) => {
        setIsDragged(boolState);
    }

    if(!isCopied){
        var icon = <i className="fas fa-clipboard"></i> 
        var msg = ''
    }else{
        icon = <div className="lottie" ref={container}></div>
        msg = "Copied";
    }
    
    const uploadAnother = () => {
        setUploadedURL("");
        setUploadedSrc("");
    }

    if (uploadedURL) {
        var isFileReady = (
            <>
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
                <button className="another file-btn" onClick={uploadAnother}>Upload another</button>
            </>
        );
    } else {
        isFileReady = (
            <FormComp
                getImageURL={getImageURL}
                getUploadedURL={getUploadedURL}
                setIsDragged={isDraggedHandler}
            />
        );
    }

    return (
        <>
            <Description />
            <ImageHolder uploadedSrc={uploadedSrc} isDragged={isDragged} />
            {isFileReady}
        </>
    );
};

export default App;
