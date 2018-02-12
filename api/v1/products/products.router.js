const router = require('express').Router();
const productCtrl = require('./products.controller');

/**
 * Effective URL is POST /products/
 *
 * This API adds a new product to the catalog
 */
router.post('/', function(req, res) {
  try {
    let newProduct = req.body;
    productCtrl.addNewProduct(newProduct, function(err, result) {
      if (err) {
        console.error('Error in adding new product, ERROR::', err);
        // res.status(400).send(err);
        res.status(400).send({ error: 'Something went wrong, please check and tray again..!' });
        return;
      }
      res.status(201).send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in adding new product, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

module.exports = router;