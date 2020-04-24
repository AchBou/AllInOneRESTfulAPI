function bookRoute (req ,res,id) {

    switch (req.method) {
        case "GET": getBooks(req,res,id); break;
        case "POST": addBook(req,res); break;
        case "PUT": updateBook(req,res ,id); break;
        case "DELETE": deleteBook(req,res,id); break;
    }
}

function getBooks(req,res,id){
    if(id) getOneBook(req,res,id);
    else getAllBooks(req,res);
}

function getOneBook(req,res,id){
    res.end("get a Book")
}

function getAllBooks(req,res){
    res.end("list books")
}

function addBook(req,res) {
    res.end("add Book")
}

function updateBook(req,res,id){
    res.end("update Book")
}

function deleteBook(req,res,id){
    res.end("delete Book")
}

exports.bookRoute = bookRoute;