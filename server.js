const express = require("express");
const multer = require("multer");
const cors = require('cors');


const app = express();
const PORT = 5000;
app.use(cors({
    "Access-Control-Allow-Origin":"*"
}))

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/test.html");
})



app.post("/upload", upload.single("image"), (req, res) => {
    res.send(req.body);
});



app.listen(PORT, () => {
    console.log("Listening at " + PORT);
});
