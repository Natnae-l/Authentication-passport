const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const router = express.Router();
const mongoose = require('mongoose');
const defRoute = require('./route/index');

const localStrat = require('./config/passport')

const mongoDb = "mongodb+srv://Natnael:VhiIqJUQBmLPbfHc@myatlasclusteredu.sp4fkpp.mongodb.net/Authentication?retryWrites=true&w=majority";
mongoose.connect(mongoDb)
    .then(() => app.listen(3003, () => console.log("app listening on port 3003!")))
    .catch(e => console.log(err))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


const app = express();
const viewsPath = path.join(__dirname, './views') 
app.set("views", viewsPath);
app.set("view engine", "ejs");

// passport local
localStrat(passport)

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


//setup routes
app.use('/', defRoute);



