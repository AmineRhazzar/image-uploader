const sendFile = (filePath, uploadPath) => {
    fetch(uploadPath, {
        method: "POST",
        body: filePath
    })
        .then((res) => console.log(res))
        .catch(
            (error) => console.log(error)
        );
};

export default sendFile;
