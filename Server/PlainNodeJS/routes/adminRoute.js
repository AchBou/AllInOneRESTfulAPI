let adminDAO = require("../DAO/adminDAO")
let jwt = require('jsonwebtoken');

function signIn(req,res) {
    let username=req.body.username;
    let password=req.body.password;
    let token;
    adminDAO.signInUser(username,password).then((isFound)=>{
        if(isFound){
            token = jwt.sign({username}, 'achPrivateKey');
            res.setHeader('token', token);
            res.writeHead(200);
            res.end("Successfully logged in");
        }
        else{
            res.writeHead(200);
            res.end("Username or password incorrect");
        }
    }
    )
}

exports.signIn = signIn;
