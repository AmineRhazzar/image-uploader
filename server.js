const express = require("express");
const multer = require("multer");
const cors = require('cors');


const app = express();
const PORT = process.env.PORT;

app.use(cors({
    "Access-Control-Allow-Origin":"*"
}))
app.use("/uploads", express.static(__dirname + "/uploads"));

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        newFileName = Date.now() + "-" + file.originalname;
        cb(null, newFileName);
    },
});

const upload = multer({ storage: fileStorageEngine });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/test.html");
})



app.post("/upload", upload.single("image"), (req, res) => {
    var pathToFile = req.file.path;
    console.log(pathToFile);
    res.json({"pathToFile" : pathToFile}); 
});



app.listen(PORT, ()=>{
    console.log("listening on port " + PORT);
});
 