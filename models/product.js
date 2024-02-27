const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    sizes: [String], // Array of available sizes
    inventory: [{
        size: String,
        quantity: {
            type: Number,
            default: 5 // Default quantity is 5
        }
    }]
});

module.exports = mongoose.model('Product', productSchema);
