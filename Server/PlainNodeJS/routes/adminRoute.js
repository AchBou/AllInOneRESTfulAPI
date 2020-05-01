let adminDAO = require("../DAO/adminDAO")
let jwt = require('jsonwebtoken');

function signIn(req,res) {
    let username=req.body.username;
    let password=req.body.password;
    let token;
    if(req.body.username&&req.body.password) {
        adminDAO.signInUser(username, password).then((isFound) => {
            if (isFound) {
                token = jwt.sign({username}, 'achPrivateKey');
                res.setHeader('token', token);
                res.writeHead(200);
                res.end("Successfully logged in");
            } else {
                res.writeHead(200);
                res.end("Incorrect Username or Password");
            }
        })
    }
    else{
        res.writeHead(400);
        res.end("Invalid request.Check your parameters");
    }
}

exports.signIn = signIn;
