import React, { useState } from "react";
import sendFile from "./client"

const FormComp = (props) => {
    const uploadPath = "http://localhost:5000/upload";

    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const handleFormSubmit = (e) => {
        // e.preventDefault();
    };

    const deleteUploaded = () => {
        setIsFileUploaded(false);
        props.getImageURL(''); //delete the url to the file uploaded
    }

    //send the uploaded file's url to the parent component
    const getFileURL = (e) => {
        e.preventDefault();
        const fileURL = URL.createObjectURL(e.target.files[0]);
        setIsFileUploaded(true);
        props.getImageURL(fileURL);
    }

    //this method allows us to open the file explorer using the custom button and not input type=file
    const openFileExplorer = () => {
        document.getElementById("file-uploader").click();
    };

    
    if (isFileUploaded) {
        var placeholder = (
            <>
                <button
                    type="submit"
                    className="submit-btn"
                >
                    Upload
                </button>

                <button className="delete-btn" onClick={deleteUploaded}>
                    Delete
                </button>
            </>
        );
    } else {
        placeholder = (
            <>
                <p>Or</p>
                <button type="button" className="file-btn" onClick={openFileExplorer}>Choose a file</button>
            </>
        );
    }

    return (
        <form action={uploadPath} method="POST" encType="multipart/form-data">
            {placeholder}
            <input id="file-uploader" type="file" name="image" hidden onChange={getFileURL}/> {/*the name attriute here is gonna be used in multer.single(____). see server.js for more.*/}
        </form>
    );
};

export default FormComp;
