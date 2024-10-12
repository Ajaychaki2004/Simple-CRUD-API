//Initialization
const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/',(req,res) =>{
    res.send("Hello from Node API")
})

//GET
app.get('/api/products', async(req,res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    } catch(error){
        res.status(500).json({messaage: error.messaage});
    }
});

app.get('/api/product/:id', async(req,res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({messaage: error.messaage});
    }
});

//POST
app.post('/api/products', async(req,res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch(error){
        res.status(500).json({messaage: error.messaage});
    }
});

//PUT
app.put('/api/product/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//DELETE
app.delete('/api/product/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({messaage: "Product deleted successfully"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Database connection
mongoose.connect('mongodb+srv://admin:ajay%402004@ajay.wu54d.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Ajay')
.then(() => {
    console.log('Connected to database!');
    app.listen(3000,() => {
        console.log('Server is running on port 3000');
    })
})
.catch(() => {
    console.log('connect failed');
});
