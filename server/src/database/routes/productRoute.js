import express from 'express';
import { isAdmin, isAuth } from '../../utils';
import { sortOrderProduct } from '../dbUtils';
import Product from '../models/productModel';

const router = express.Router();

// List all products
router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i',
    },
  } : {};
  const sortOrder = sortOrderProduct(req);
  const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
  res.send(products);
});

// Get one Product (Details)
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    return res.send(product);
  } catch (error) {
    return res.status(404).send({ message: 'Product Not Found' });
  }
});

// Create a product
router.post('/', isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    return res.status(201).send({ message: 'New Product Created', data: newProduct });
  } catch (error) {
    return res.status(500).send({ message: 'Error in Creating Product' });
  }
});

// Update a product
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
  } catch (error) {
    return res.status(500).send({ message: 'Error while updating the product' });
  }
});

// Delete product
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findById(req.params.id);
    await deletedProduct.remove();
    return res.send({ message: 'Product deleted.' });
  } catch (error) {
    return res.status(404).send({ message: 'Error while deleting product.' });
  }
});

// Create a review
router.post('/:id/reviews', isAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((a, c) => Number(c.rating) + a, 0)
      / product.reviews.length;
    const updatedProduct = await product.save();
    return res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } catch (error) {
    return res.status(404).send({ message: 'Product Not Found' });
  }
});

export default router;
