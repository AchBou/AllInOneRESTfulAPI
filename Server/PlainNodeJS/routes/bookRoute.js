let bookDAO = require("../DAO/bookDAO");

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
    bookDAO.getOneBook(id).then((book)=>{
        if(book){
            res.writeHead(201);
            res.end(JSON.stringify(book));
        }
        else{
            res.writeHead(200);
            res.end("There is no such book");
        }
    })
    .catch((err) => {
        console.log(err)
    });
}

function getAllBooks(req,res){
    bookDAO.getAllBooks().then(books=> {
        res.writeHead(200);
        res.end(JSON.stringify(books));
    })
    .catch((err) => {
        console.log(err)
    });
}

function addBook(req,res) {
    if(req.body.title&&req.body.author&&req.body.edition&&req.body.type){
        let book=req.body;
        bookDAO.addBook(book)
            .then(()=> {
                res.writeHead(201);
                res.end("Successfully added");
            })
            .catch((err) => {
                console.log(err)
            });
    }
    else{
        res.writeHead(400);
        res.end("Invalid request.Check your parameters");
    }
}

function updateBook(req,res,id){
    if(req.body.title&&req.body.author&&req.body.edition&&req.body.type){
        let book=req.body;
        bookDAO.updateBook(book,id)
            .then(()=> {
                res.writeHead(201);
                res.end("Successfully Updated");
            })
            .catch((err) => {
                console.log(err)
            });
    }
    else{
        res.writeHead(400);
        res.end("Invalid request.Check your parameters");
    }
}

function deleteBook(req,res,id){
    bookDAO.deleteBook(id)
        .then(()=> {
            res.writeHead(201);
            res.end("Successfully deleted");
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.bookRoute = bookRoute;