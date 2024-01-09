const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images:[
        {
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                // required: true
            }
        }
    ], 
    category: {
           type: String,
           required: [true, 'Please select product category'],
           enum:{
            values: [
                'Sách văn học',
                'Sách kinh tế',
                'Sách kỹ năng sống',
                'Sách Học Ngoại Ngữ',
                'Sách Kiến Thức Tổng Hợp',
                'Sách Lịch sử'
                
            ],
            message: 'Please select correct category for product'
           }
    },
    seller:{
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock:{
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            name:{
                type: String,
                require: true
            },
            rating:{
                type: Number,
                require: true
            },
            comment:{
                type: String,
                require: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 

})

module.exports = mongoose.model('Product', productSchema);