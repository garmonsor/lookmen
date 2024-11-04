const express = require("express")
require("dotenv").config()
var app = express();
const path = require("path" )
const http = require('http')
const server = http.createServer(app)
const homeRouter = require("./routes/index")
const port = process.env.PORT || 3000
const { GoogleGenerativeAI } = require("@google/generative-ai");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router handler middleware
app.use((req, res, next)=>{
    const genAI = new GoogleGenerativeAI(process.env.API_KEY)
    req.ai = genAI
    req.model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})
    next()
})
app.use('/', homeRouter);

app.set('port',port)
server.listen(port)
server.on("listening", ()=>{console.log(`App started on www.localhost:${port}`)})