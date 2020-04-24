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

}

function getAllShows(req,res){

}

function addShow(req,res) {
    console.log("add show")
}

function updateShow(req,res,id){
    console.log("update show")
}

function deleteShow(req,res,id){
    console.log("delete show")
}

exports.showRoute = showRoute;