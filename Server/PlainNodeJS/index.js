const http = require('http')
const url = require('url');
const jwt = require('jsonwebtoken');

var userRoute = require("./routes/userRoute");
var movieRoute = require("./routes/movieRoute");
var showRoute = require("./routes/showRoute");
var bookRoute = require("./routes/bookRoute");
var websiteRoute = require("./routes/websiteRoute");
var adminRoute = require("./routes/adminRoute");

const server = http.createServer();

server.on('request', bodyParser);

function bodyParser(req,res) {
    let data=[];
    req.on('data', chunk => {
        data.push(chunk)
    })
    req.on('end', () => {
        if(data.length) req.body=JSON.parse(data);
        onRequest(req, res);
    })
}

function onRequest(req, res){
    res.setHeader('Content-Type', 'application/json');
    let token=req.headers.token;
    let pathName = url.parse(req.url).pathname;
    let pathVariables=pathName.split('/')// ex: pathVariables = ['/','user','5']
    if(!pathVariables[1]){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200);
        res.write('Welcome to The FavApp API, to learn more about how to use these Endpoints, please refer to the <a href="https://stoplight.io/p/docs/gh/achbou/spotlight-api-design">Docs</a>')
        res.end();
    }

    if(pathVariables[1]== "signin"||pathVariables[1]== "signin"){
        if(pathVariables[1]== "signin") adminRoute.signIn(req,res);
        if(pathVariables[1]== "signup") adminRoute.signUp(req,res);
    }
    else{

        UnauthorizedErrorHandler(res,token);

        if (pathVariables[1]== "users") userRoute.userRoute(req,res,pathVariables[2]);
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
                    NotFoundErrorHandler(res);
            }
        }
        else {
            NotFoundErrorHandler(res);
        }
    }

}


function NotFoundErrorHandler(res){
    res.writeHead(404);
    res.end("404 Not found!")
}


function UnauthorizedErrorHandler(res,token){
    try{
        if(!token) throw new Error("No token provided");
        let decoded = jwt.verify(token, 'achPrivateKey');
    } catch(err) {
        res.writeHead(401);
        res.end("401 Unauthorized!")
    }
}



server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(3000, function(){
    console.log("server started at port 3000");
});

