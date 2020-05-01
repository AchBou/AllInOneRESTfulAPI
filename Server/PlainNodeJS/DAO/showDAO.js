const admin = require("../db/firestore");

let db = admin.firestore();

function showDAO() {

}


showDAO.prototype.getAllShows=function(){

    let shows=[];

    return db.collection('shows').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.id, '=>', doc.data());
                shows.push(doc.data());
            });
            return shows;
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
}

showDAO.prototype.getOneShow=function(id){

    let show;
    let doc = db.collection('shows').doc(id).get();

    return doc.then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            show=null;
        } else {
            console.log('Document data:', doc.data());
            show=doc.data();
        }
        return show;
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
}

showDAO.prototype.addShow=function(show){

    let newShowRef=db.collection('shows').doc();
    show.id=newShowRef.id;

    return newShowRef.set(show)
        .then(()=> {
            console.log("Document written with ID: ", newshowRef.id);
        })
        .catch((error)=> {
            console.error("Error adding document: ", error);
        })
}

showDAO.prototype.deleteShow=function(id){

    let deletedDoc = db.collection('shows').doc(id).delete();

    return deletedDoc.then(res => {
        console.log('Deleted: ', res);
    })
    .catch((error)=> {
        console.log("Error deleting document: ", error);
    });
}


showDAO.prototype.updateShow=function(show,id){

    let updateDoc = db.collection('shows').doc(id).update(show);

    return updateDoc.then(res => {
        console.log('Updated: ', res);
    })
    .catch((error)=> {
        console.log("Error updating document: ", error);
    });
}


module.exports = new showDAO();
