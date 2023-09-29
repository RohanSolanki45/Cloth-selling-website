const mongoose = require("mongoose")

const productScheme = mongoose.Schema({
    imageUrl:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        enum:['S','M',"L","XL",'XXL'],
        required:true,
    },
    price:{
        type:Number,
        required:true,
        validator(val){
            if (val<=0){
                throw new err("Price must be positive")
            }
        }
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default : Date.now
    },
    quantity:{
        type: Number,
       required: true
    }

})

module.exports = mongoose.model('product',productScheme)