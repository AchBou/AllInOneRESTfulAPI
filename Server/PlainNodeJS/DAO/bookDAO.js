const admin = require("../db/firestore");

let db = admin.firestore();

function bookDAO() {

}


bookDAO.prototype.getAllBooks=function(){

    let books=[];

    return db.collection('books').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.id, '=>', doc.data());
                books.push(doc.data());
            });
            return books;
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
}

bookDAO.prototype.getOneBook=function(id){

    let book;
    let doc = db.collection('books').doc(id).get();

    return doc.then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            book=null;
        } else {
            console.log('Document data:', doc.data());
            book=doc.data();
        }
        return book;
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
}

bookDAO.prototype.addBook=function(book){

    let newBookRef=db.collection('books').doc();
    book.id=newBookRef.id;

    return newBookRef.set(book)
        .then(()=> {
            console.log("Document written with ID: ", newBookRef.id);
        })
        .catch((error)=> {
            console.error("Error adding document: ", error);
        })
}

bookDAO.prototype.deleteBook=function(id){

    let deletedDoc = db.collection('books').doc(id).delete();

    return deletedDoc.then(res => {
        console.log('Deleted: ', res);
    })
    .catch((error)=> {
        console.log("Error deleting document: ", error);
    });
}


bookDAO.prototype.updateBook=function(book,id){

    let updateDoc = db.collection('books').doc(id).update(book);

    return updateDoc.then(res => {
        console.log('Updated: ', res);
    })
    .catch((error)=> {
        console.log("Error updating document: ", error);
    });
}


module.exports = new bookDAO();
