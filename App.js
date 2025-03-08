const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const index = require("./routes/index");
const aiRouter = require("./routes/aiRouter");
const usersRouter = require("./routes/usersRouter");
const adminRouter = require("./routes/adminRouter");
const expressSession = require("express-session");
const categoryMiddleware = require('./middlewares/categoryMiddleware');
const flash = require("connect-flash");

process.removeAllListeners("exit");
process.on("exit", () => {
    console.log("Process exiting...");
});

const db = require("./config/mongoose-connection");
require("dotenv").config();

// app.use(categoryMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.Express_SESSION_SECRET,
  })
);
app.set("view engine", "ejs");
app.use("/ai",aiRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/", index);

app.listen(3000);
 