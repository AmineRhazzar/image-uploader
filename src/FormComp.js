import React, { useState, useRef, useEffect } from "react";
import lottie from "lottie-web";
import sendFile from "./client";

const FormComp = (props) => {
    const uploadPath = "https://img-upld-mania.herokuapp.com/upload"; //path to upload the file

    const [uploadingState, setUploadingState] = useState(false);//to decide whether to show loader or no
    const [isFileUploaded, setIsFileUploaded] = useState(false);//to know when the file is uploaded so we get its path
    const [file, setFile] = useState();//to get the uploaded image locally, and send it in the formData
    const [submitClass, setSubmitClass] = useState("submit-btn"); //changes the class of the submit button for css purposes
    
    const fileUploader = useRef(null);
    const container = useRef(null);//access the loader container

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: require("./lottie-loader.json"),
            name: "lottie-loader",
        });
    }, [uploadingState]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitClass("submit-btn clicked");
        setTimeout(()=>{
            const formData = new FormData();
            formData.append("image", file);
    
            setUploadingState(true);
    
            sendFile(formData, uploadPath).then((pathToFile) => {
                props.getUploadedURL(pathToFile);
            });
        }, 300); //300ms = 0.3s is the duration of the animation for the submit btn

    };

    const deleteUploaded = () => {
        setIsFileUploaded(false);
        props.getImageURL(""); //delete the url to the file uploaded
        props.setIsDragged(false);
    };

    //send the uploaded file's url to the parent component
    const getFileURL = (e) => {
        e.preventDefault();
        const fileURL = URL.createObjectURL(e.target.files[0]);
        setIsFileUploaded(true);
        setFile(e.target.files[0]);
        props.getImageURL(fileURL);
    };

    //this method allows us to open the file explorer using the custom button and not input type=file
    const openFileExplorer = () => {
        fileUploader.current.click();
    };

    const onDragHandler = () => {
        props.setIsDragged(true);
    };
    const onDragEndHandler = () => {
        props.setIsDragged(false);
    };

    if (isFileUploaded) {
        if (uploadingState) {
            var placeholder = (
                <>
                    <div class="loader" ref={container}></div>
                    <button className="delete-btn" onClick={deleteUploaded}>
                        Delete
                    </button>
                </>
            );
        } else {
            placeholder = (
                <>
                    <button
                        type="submit"
                        className={submitClass}
                        onClick={handleFormSubmit}
                    >
                        Upload
                    </button>

                    <button className="delete-btn" onClick={deleteUploaded}>
                        Delete
                    </button>
                </>
            );
        }
    } else {
        placeholder = (
            <>
                <p>Or</p>
                <button
                    type="button"
                    className="file-btn"
                    onClick={openFileExplorer}
                >
                    Choose a file
                </button>
            </>
        );
    }

    return (
        <form action={uploadPath} method="POST" encType="multipart/form-data">
            {placeholder}
            <input
                className="file-uploader"
                type="file"
                name="image"
                ref={fileUploader}
                onChange={getFileURL}
                onDragOver={onDragHandler}
                onDragLeave={onDragEndHandler}
            />{" "}
            {/*the name attriute here is gonna be used in multer.single(____). see server.js for more.*/}
        </form>
    );
};

export default FormComp;
