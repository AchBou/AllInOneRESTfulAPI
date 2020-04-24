const http = require('http')
const url = require('url');

var userRoute = require("./routes/userRoute");
var movieRoute = require("./routes/movieRoute");
var showRoute = require("./routes/showRoute");
var bookRoute = require("./routes/bookRoute");
var websiteRoute = require("./routes/websiteRoute");

const server = http.createServer();

server.on('request', onRequest);

function onRequest(req, res){

    res.setHeader('Content-Type', 'application/json');
    let pathName = url.parse(req.url).pathname;
    let pathVariables=pathName.split('/')// ex: pathVariables = ['/','user','5']
    if(!pathVariables[1]){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200);
        res.write('Welcome to The FavApp API, to learn more about how to use these Endpoints, please refer to the <a href="https://stoplight.io/p/docs/gh/achbou/spotlight-api-design">Docs</a>')
        res.end();
    }

    else if (pathVariables[1]== "user") userRoute.userRoute(req,res,pathVariables[2]);
    else if (pathVariables[1]== "favorites"){
        switch (pathVariables[2]) {
            case "movies":
                movieRoute.movieRoute(req, res, pathVariables[3]);
                break;
            case "shows":
                showRoute.showRoute(req, res, pathVariables[3]);
                break;
            case "books":
                bookRoute.bookRoute(req, res, pathVariables[3]);
                break;
            case "websites":
                websiteRoute.websiteRoute(req, res, pathVariables[3]);
                break;
            default:
                errorHandler(res);
        }
    }
    else {
        errorHandler(res);
    }
}

function errorHandler(res){
    res.writeHead(404);
    res.end("404 Not found!")
}
server.listen(3000, function(){
    console.log("server started at port 3000");
});