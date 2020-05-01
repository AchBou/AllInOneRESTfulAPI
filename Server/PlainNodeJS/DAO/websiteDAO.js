const admin = require("../db/firestore");

let db = admin.firestore();

function websiteDAO() {

}


websiteDAO.prototype.getAllWebsites=function(){

    let websites=[];

    return db.collection('websites').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.id, '=>', doc.data());
                websites.push(doc.data());
            });
            return websites;
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
}

websiteDAO.prototype.getOneWebsite=function(id){

    let website;
    let doc = db.collection('websites').doc(id).get();

    return doc.then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            website=null;
        } else {
            console.log('Document data:', doc.data());
            website=doc.data();
        }
        return website;
    })
        .catch(err => {
            console.log('Error getting document', err);
        });
}

websiteDAO.prototype.addWebsite=function(website){

    let newWebsiteRef=db.collection('websites').doc();
    website.id=newWebsiteRef.id;

    return newWebsiteRef.set(website)
        .then(()=> {
            console.log("Document written with ID: ", newWebsiteRef.id);
        })
        .catch((error)=> {
            console.error("Error adding document: ", error);
        })
}

websiteDAO.prototype.deleteWebsite=function(id){

    let deletedDoc = db.collection('websites').doc(id).delete();

    return deletedDoc.then(res => {
        console.log('Deleted: ', res);
    })
        .catch((error)=> {
            console.log("Error deleting document: ", error);
        });
}


websiteDAO.prototype.updateWebsite=function(website,id){

    let updateDoc = db.collection('websites').doc(id).update(website);

    return updateDoc.then(res => {
        console.log('Updated: ', res);
    })
        .catch((error)=> {
            console.log("Error updating document: ", error);
        });
}


module.exports = new websiteDAO();
