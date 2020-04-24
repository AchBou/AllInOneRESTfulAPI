let data = require("../mock/MOCK_DATA.json")

function userDAO() {

}



userDAO.prototype.getAllUsers=function(){
    return data;
}

userDAO.prototype.getOneUser=function(id){
    return data.find(user=>user.id=id);
}


module.exports = new userDAO();

