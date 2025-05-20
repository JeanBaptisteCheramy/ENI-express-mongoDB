const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        message: 'This title of article already exists'
    },
    content:{
        type: String,
        required: [true, 'Content is required']
    },
    author:{
        type: String,
        required: [true, 'Author is required']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

articleSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const message = `The field '${Object.keys(error.keyValue)[0]}' already exist.`;
        next(new Error(message));
    } else {
        next(error);
    }
})



module.exports = mongoose.model('Article', articleSchema)