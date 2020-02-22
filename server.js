const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.static(`${__dirname}/client/build`));

app.get("/health", (req, res) => {
    res.send({
        health: "UP"
    });
});

app.get("/*", function (req, res) {
    res.sendFile(`${__dirname}/client/build/index.html`, function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// log your server is running and the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Click here to open: http://localhost:${port}`)
});