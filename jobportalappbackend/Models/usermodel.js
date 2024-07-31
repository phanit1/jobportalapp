const mongoose = require("mongoose");

const userData = mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type: String,
        required : true,
        unique: true
        } ,
    email : {
        type: String,
        required: true,
        unique: true
    },
    roleType : {
        type :String,
        enum: ['admin', 'employer','jobseeker'],
        required :true
    }
    
})

module.exports = mongoose.model("userdata", userData);

// {
//     "userName": "sribalajin",
//     "password": "Balu@12345",
//     "email": "balaji@gmail.com",
//     "roleType": "employer"
// }