require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");

const Blog=require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute=require("./routes/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/auth");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
// app.use(express.static(path.resolve("./public/images")));
app.use(express.static(path.resolve("./public/images")));

app.get("/", async (req, res) => {
const allBlogs = await Blog.find({});
const user = await User.findById(req.user._id);
console.log("req.user", user);
  res.render("home", {
    user: user,
    blogs: allBlogs,
  });
  
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
