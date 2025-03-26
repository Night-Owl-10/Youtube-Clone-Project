const express = require("express");
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json());
app.use(cookieParser());
require("./Connection/connection")

const AuthRoutes = require("./Routes/user.routes");
const VideoRoutes = require("./Routes/video.routes");
const CommentRoutes = require("./Routes/comment.routes");

app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentApi", CommentRoutes);

app.listen(port, () => {
    console.log("Server is running on port 4000")
})