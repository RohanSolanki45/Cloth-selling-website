const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Product = require("../model/Product")
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'fashion@Factory'

// fetch Product || Method : GET

router.get('/fetchproduct', async (req, res) => {

    try {
        const product = await Product.find()
        return res.json({ status: true, data: product })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: false, message: "Internal server error" })
    }
})

// add Product || Method : POST

router.post('/addproduct',
    async (req, res) => {
        try {
            const { imageUrl, brand, title, size, price, description, category, quantity } = req.body
            let product = new Product({
                imageUrl, brand, title, size, price, description, category, quantity

            })
            const saveProduct = await product.save()

            return res.json({ status: true, data: saveProduct })
        } catch (error) {
            console.log("error:", error.message)
            return res.status(500).json({ status: false, message: "Internal server error" })
        }
    })



// UPDATE Product || METHOD  : PUT

router.put('/updateproduct/:id', async (req, res) => {
    try {
        const { imageUrl, brand, title, size, price, description, category, quantity } = req.body
        const newProduct = {}
        if (imageUrl) { newProduct.imageUrl = imageUrl }
        if (brand) { newProduct.brand = brand }
        if (quantity) { newProduct.quantity = quantity }
        if (title) { newProduct.title = title }
        if (size) { newProduct.size = size }
        if (price) { newProduct.price = price }
        if (description) { newProduct.description = description }
        if (category) { newProduct.category = category }

        let product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).send({ status: false, message: "Not found" })
        }
        product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
        return res.json({ status: true, data: product })
        // return event
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: "Internal server error in edit" })
    }
})

// delete Product || Method : DELETE

router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).send({ status: false, message: "Not found" })
        }
        product = await Product.findByIdAndDelete(req.params.id)
        res.json({ status: true, data: product })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: "Internal server error" })
    }
})

// place order

router.post('/placeorder', fetchuser, async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: "Internal server error" })
    }
})

module.exports = router