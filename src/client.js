const sendFile = (formData, uploadPath) => {
    return fetch(uploadPath, {
        method: "POST",
        body: formData
    })
        .then((res) => res.json())
        .then(success => success.pathToFile)
        .catch(
            (error) => console.log(error)
        );
};

export default sendFile;
