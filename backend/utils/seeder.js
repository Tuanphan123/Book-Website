const Product = require('../models/product')
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products');

const {connect } = require('mongoose');

dotenv.config({path: '../config/config.env'});

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products deleted');

        await Product.insertMany(products);
        console.log('Products added');

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

seedProducts();