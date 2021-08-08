const cors = require("cors");
const dotEnv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const authRoute = require("./routes/auth-route");
const commentsRoute = require("./routes/comments-route");
const frdRequestsRoute = require("./routes/frd-requests-route");
const postsRoute = require("./routes/posts-route");
const usersRoute = require("./routes/users-route");

const app = express();
dotEnv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB = process.env.MONGODB;
mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use("/auth", authRoute);
app.use("/frdrequests", frdRequestsRoute);
app.use("/posts", commentsRoute);
app.use("/posts", postsRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.json({
    success: "Connected odin-book",
  });
});

app.listen(PORT, () => {
  console.log(`Listning on ${PORT}`);
});
