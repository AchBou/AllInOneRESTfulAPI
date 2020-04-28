let showDAO = require("../DAO/showDAO");

function showRoute (req ,res,id) {
    switch (req.method) {
        case "GET": getShows(req,res,id); break;
        case "POST": addShow(req,res); break;
        case "PUT": updateShow(req,res ,id); break;
        case "DELETE": deleteShow(req,res,id); break;
    }
}

function getShows(req,res,id){
    if(id) getOneShow(req,res,id);
    else getAllShows(req,res);
}

function getOneShow(req,res,id){
    showDAO.getOneShow(id).then((show)=>{
        if(show){
            res.writeHead(201);
            res.end(JSON.stringify(show));
        }
        else{
            res.writeHead(200);
            res.end("There is no such show");
        }
    })
        .catch((err) => {
            console.log(err)
        });
}

function getAllShows(req,res){
    showDAO.getAllShows().then(shows=> {
        res.writeHead(200);
        res.end(JSON.stringify(shows));
    })
        .catch((err) => {
            console.log(err)
        });
}

function addShow(req,res) {
    showDAO.addShow(req)
        .then(()=> {
            res.writeHead(201);
            res.end("Successfully added");
        })
        .catch((err) => {
            console.log(err)
        });
}

function updateShow(req,res,id){
    showDAO.updateShow(req,id)
        .then(()=> {
            res.writeHead(201);
            res.end("Successfully Updated");
        })
        .catch((err) => {
            console.log(err)
        });
}

function deleteShow(req,res,id){
    showDAO.deleteShow(id)
        .then(()=> {
            res.writeHead(201);
            res.end("Successfully deleted");
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.showRoute = showRoute;