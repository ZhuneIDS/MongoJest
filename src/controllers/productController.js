// src/controllers/productController.js
const Product = require('../models/Product');

// export de todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos.', error });
  }
};

// export de un producto
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto.', error });
  }
};

//export de actualizar un producto con  id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el producto.', error });
  }
};

// export de eliminar un producto con id
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el producto.', error });
  }
};