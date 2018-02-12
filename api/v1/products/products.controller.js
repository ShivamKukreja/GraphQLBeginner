const productService = require('./products.service');

const addNewProduct = function(newProduct, done) {
  productService.addNewProduct(newProduct, done);
}

module.exports = {
  addNewProduct
}