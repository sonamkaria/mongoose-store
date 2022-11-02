// This is the controller file for Books
const express = require('express')
//Initializing router
const productRouter = express.Router()
//importing dataset from seed - controller
const productData = require("../models/seed")
//importing schema from controller
const Product = require('../models/product.js')

//INDUCES

//SEED
productRouter.get("/seed", (req, res) => {
    //mongoose method - delete resets everything
    Product.deleteMany({}, (error, allProducts) => {})
    //creates a new route
    Product.create(productData, (error, data) => {
      res.redirect("/products");
    });
  })

// INDEX
productRouter.get("/", (req, res) => {
    Product.find({}, (error, products) => {
      res.render("index.ejs", { products: products })
     
    })
  })

  // NEW
productRouter.get("/new", (req, res) => {
    res.render("new.ejs")
  })
  
  // DELETE
  productRouter.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
      res.redirect("/products")
    })
  })



// UPDATE
productRouter.put("/:id", (req, res) => {
    //req.body.qty = (req.body.qty === 0) ? "outof stock" : req.body.qty;
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, products) => {
      // redirect user to showpage
      res.redirect(`/products/${req.params.id}`);
    })
  })

  // CREATE
productRouter.post("/", (req, res) => {
    Product.create(req.body, (error, products) => {
      res.redirect("/products")
    })
  })



  // EDIT
productRouter.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (err, products) => {
      res.render("edit.ejs", { products: products })
    })
  })

  //SHOW
  productRouter.get("/:id", (req,res) =>{
    quantity = 0
    Product.findById(req.params.id, (err,foundProduct)=>{
        // if (foundProduct.qty===0) {
        //     quantity = "out of stock"
        // } else {
        //     quantity =foundProduct.qty + " Remaining"
         
        // }
        res.render("show.ejs",{
            product:foundProduct, 
            quantity:quantity})
    })
  })

  module.exports = productRouter  

