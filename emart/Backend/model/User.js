const mongoose =  require('mongoose')

const userSchema = mongoose.Schema({

    fname:{
        type : String,
        required : true,
    },
    lname:{
        type:String,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true,
    },
    date:{
        type : Date,
        default:Date.now
    }
})

module.exports = mongoose.model('user',userSchema)