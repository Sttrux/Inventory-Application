//env
require('dotenv').config();
//express
const express = require("express");
const app = express();
//path
const path = require("node:path");
//router
const indexRoutes = require("./routes/indexRouter");

//path routes
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPublic = path.join (__dirname, "public");
app.use(express.static(assetsPublic));

//middleware decodify forms
app.use(express.urlencoded({extended:true}));

//Routes
app.use("/",indexRoutes);



//listening server
app.listen(process.env.LISTENING_PORT);