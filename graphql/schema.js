const graphql = require('graphql');

const ProductModel = require('../api/v1/products/products.entity');

var productType = new graphql.GraphQLObjectType({
    name: "product",
    fields: function () {
        return {
            sku: {
                type: graphql.GraphQLString
            },
            status: {
                type: graphql.GraphQLString
            },
            vendor: {
                type: graphql.GraphQLString
            }
        }
    }

});

var productQuery = new graphql.GraphQLObjectType({
    name: "rootProductQuery",
    fields: {
        products: {
            type: new graphql.GraphQLList(productType),
            args: {
                vendor: {
                    name: "vendor",
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve : function (parentValue, {vendor}, request) {
                return new Promise((resolve, reject) => {
                    ProductModel.find({vendor}, (err, products) => {
                        err ? reject(err) : resolve(products);
                    });
                });
            }
        }
    }    
});

var productSchema = new graphql.GraphQLSchema({
    query: productQuery
});

module.exports = productSchema;