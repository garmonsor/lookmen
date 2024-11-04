const express = require("express")
var app = express();
const path = require("path" )
const http = require('http')
const server = http.createServer(app)
const homeRouter = require("./routes/index")
const port = process.env.PORT || 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router handler middleware
app.use('/', homeRouter);

app.set('port',port)
server.listen(port)
server.on("error", ()=>{console.error('Error starting server')})
server.on("listening", ()=>{console.log(`App started on www.localhost:${port}`)})