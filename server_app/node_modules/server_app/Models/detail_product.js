var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_product: {
            type: String,
            ref: 'Products'
        },
        type: String,
        value: String
    }
);

var Detail_Product = mongoose.model('Detail_Product', schema, 'detail_product');

module.exports = Detail_Product;