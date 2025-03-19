const express = require("express");
const app = express();
const port = 4000;


app.use(express.json());
require("./Connection/connection")

const AuthRoutes = require("./Routes/user.routes");

app.use("/auth", AuthRoutes);

app.listen(port, () => {
    console.log("Server is running on port 4000")
})