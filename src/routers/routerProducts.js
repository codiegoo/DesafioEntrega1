const { Router } = require('express')
const productManager = require('../productManager')
const router = Router()


router.post('/', (req, res) => {

  const {product} = req.body
  res.json({message: 'producto creado'})
  const addProduct = productManager.addProduct(product)
  addProduct
})

router.get('/', (req, res) => {
  const productsLim = parseInt(req.query.limit)
  try {
    const products = productManager.getProducts(productsLim)
    res.send({message:products})
  } catch (error) {
    console.error('error al cargar los mproductos', error)
  }
})


router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid)
  try {
    const getProductById = productManager.getProductById(productId)
    res.send({message: getProductById})
  } catch (error) {
    console.error(`error al cargar su producto ${productId}`,error)
  }
})


router.patch('/:pid', (req, res) => {

  const productId = parseInt(req.params.pid)
  const updates = req.body
  try {
    productManager.updateProduct(productId, updates)
    res.send({message: 'producto actualizado'})
  } catch (error) {
    console.error(`error al actualizar el producto ${productId}`)
  }
})


// Eliminar un producto específico
router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid)
  try {
    productManager.deleteProduct(productId)
    res.send({message: `Producto con id ${productId} ha sido eliminado`})
  } catch (error) {
    console.error(`Error al eliminar el producto con id ${productId}`, error)
    res.status(500).send({error: `Error al eliminar el producto con id ${productId}`})
  }
})

module.exports = router