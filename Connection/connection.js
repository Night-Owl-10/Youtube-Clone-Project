const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DataBase connection is sucessful"))
    .catch(err => { console.log(err) });