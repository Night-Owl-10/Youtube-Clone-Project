const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();


const allowedOrigins = [
    "http://localhost:5173",
    "https://youtube-clone-project-orcin.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);


app.use(express.json());
app.use(cookieParser());
require("./Connection/connection")

const AuthRoutes = require("./Routes/user.routes");
const VideoRoutes = require("./Routes/video.routes");
const ChannelRoutes = require("./Routes/channel.routes");
const CommentRoutes = require("./Routes/comment.routes");

app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/api", ChannelRoutes);
app.use("/commentApi", CommentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})