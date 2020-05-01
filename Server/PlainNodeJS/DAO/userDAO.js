const admin = require("../db/firestore");


let db = admin.firestore();

function userDAO() {

}


userDAO.prototype.getAllUsers=function(){
    let users=[];

    return db.collection('users').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.id, '=>', doc.data());
                users.push(doc.data());
            });
        return users;
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
}

userDAO.prototype.getOneUser=function(id){

    let doc = db.collection('users').doc(id).get();
    return doc.then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            user=null;
        } else {
            console.log('Document data:', doc.data());
            user=doc.data();
        }
        return user;
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
}

userDAO.prototype.addUser=function(user){

    let newUserRef=db.collection('users').doc();
    user.id=newUserRef.id;

    return newUserRef.set(user)
        .then(()=> {
            console.log("Document written with ID: ", newUserRef.id);
        })
        .catch((error)=> {
            console.error("Error adding document: ", error);
        })
}

userDAO.prototype.deleteUser=function(id){

    let deletedDoc = db.collection('users').doc(id).delete();

    return deletedDoc.then(res => {
        console.log('Deleted: ', res);
    })
    .catch((error)=> {
        console.log("Error deleting document: ", error);
    });
}


userDAO.prototype.updateUser=function(user,id){

    let updateDoc = db.collection('users').doc(id).update(user);

    return updateDoc.then(res => {
        console.log('Updated: ', res);
    })
    .catch((error)=> {
        console.log("Error updating document: ", error);
    });
}


module.exports = new userDAO();

