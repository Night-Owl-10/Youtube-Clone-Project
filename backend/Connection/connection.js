const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/YoutubeClone")
    .then(() => console.log("DataBase connection is sucessful"))
    .catch(err => { console.log(err) });