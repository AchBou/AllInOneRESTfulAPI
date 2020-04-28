const admin = require("../db/firestore");

let db = admin.firestore();

function movieDAO() {

}


movieDAO.prototype.getAllMovies=function(){

    let movies=[];

    return db.collection('movies').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.id, '=>', doc.data());
                movies.push(doc.data());
            });
            return movies;
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
}

movieDAO.prototype.getOneMovie=function(id){

    let movie;
    let doc = db.collection('movies').doc(id).get();

    return doc.then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            movie=null;
        } else {
            console.log('Document data:', doc.data());
            movie=doc.data();
        }
        return movie;
    })
        .catch(err => {
            console.log('Error getting document', err);
        });
}

movieDAO.prototype.addMovie=function(req){

    let movie = req.body;
    let newmovieRef=db.collection('movies').doc();
    movie.id=newmovieRef.id;

    return newmovieRef.set(movie)
        .then(()=> {
            console.log("Document written with ID: ", newmovieRef.id);
        })
        .catch((error)=> {
            console.error("Error adding document: ", error);
        })
}

movieDAO.prototype.deleteMovie=function(id){

    let deletedDoc = db.collection('movies').doc(id).delete();

    return deletedDoc.then(res => {
        console.log('Deleted: ', res);
    })
        .catch((error)=> {
            console.log("Error deleting document: ", error);
        });
}


movieDAO.prototype.updateMovie=function(req,id){

    let updateDoc = db.collection('movies').doc(id).update({
        title:req.body.title,
        year:req.body.year,
        genre:req.body.genre,
        director:req.body.director
    });

    return updateDoc.then(res => {
        console.log('Updated: ', res);
    })
    .catch((error)=> {
        console.log("Error updating document: ", error);
    });
}


module.exports = new movieDAO();
