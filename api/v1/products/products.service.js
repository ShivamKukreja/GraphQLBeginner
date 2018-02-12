const ProductModel = require('./products.entity');

const addNewProduct = function(newProduct, done) {
  let product = new ProductModel();
  product.name = newProduct.name;
  product.code = newProduct.code;
  product.vendor = newProduct.vendor;
  product.sku = newProduct.sku;
  product.price = newProduct.price;
  product.status = newProduct.status;
  product.quantity = newProduct.quantity;
  product.addedBy = newProduct.addedBy;
  product.spec = newProduct.spec;

  product.save(function(err, savedDoc) {
    if (err) {
      console.error("Error in adding new product, ERROR::", err);
      done(err);
    } else {
      done(null, savedDoc);
      return
    }
  });
}

module.exports = {
  addNewProduct
}