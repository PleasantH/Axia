const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    },


    password: {
        type: String,
        required: true,
    },


    admin: {
        type: Boolean,
        default: 'false'
    },


    AltimaAdmin: {
        type: Boolean,      
        default: 'false'
    },  
   
    profile: {
        country: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true
        },
        street: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            required: true,
           
        },


    },
}, {timestamps: true})


const User = mongoose.model('user', userSchema)


module.exports = User
