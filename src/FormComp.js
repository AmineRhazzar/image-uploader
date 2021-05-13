import React, { useState } from "react";

const FormComp = (props) => {
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
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
                    onClick={handleFormSubmit}
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
                <input id="file-uploader" type="file" name="file" hidden onChange={getFileURL}/>
            </>
        );
    }

    return (
        <form>
            {placeholder}
        </form>
    );
};

export default FormComp;
