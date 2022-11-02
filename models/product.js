const { text } = require('express')
const mongoose = require('mongoose')

//This is our product schema
const productSchema = new mongoose.Schema({
    name: {type:String, required:true },
    img:{type:String, required:true },
    description:{type: String, required: true},
    price:{type: Number, required: true},
    qty:{type: Number, required: true},
    
})

//This is where we define out model using the schema we created
const Product = mongoose.model("Product", productSchema)

//this is how we send vars to other files
module.exports = Product