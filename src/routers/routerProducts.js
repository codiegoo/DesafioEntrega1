const { Router } = require('express')
const productManager = require('../productManager')
const router = Router()


// Permite crar un producto desde el body, siempre y cuando sea un objeto con todas sus propiedaddes adecuadas
router.post('/', (req, res) => {

  const {product} = req.body

  try {
    productManager.addProduct(product)
    res.status(201).send({message: 'producto creado'})
  } catch (error) {
    console.error(error)
    res.status(400).send({error:`error al crear el producto, verifica que sea un objeto y cuente con las claves y valores correctos`})
  }
})

// Muestra todos los productos existentes
router.get('/', (req, res) => {
  const productsLim = parseInt(req.query.limit)
  try {
    const productos = productManager.getProducts(productsLim)
    res.status(200).send({message: productos})
  } catch (error) {
    console.error(error)
    res.status(500).send({error:`error al cargar los productos`})
  }
})

// Muestra un producto en particular
router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid)
  try {
    const product = productManager.getProductById(productId)
    res.status(200).send({message: product})
  } catch (error) {
    console.error(error)
    res.status(404).send({message: `producto ${productId} no encontrado`})
  }
})

// Actualiza una o mas propiedades en especifico de un objeto producto
router.patch('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid)
  const updates = req.body
  try {
    const updateProduct = productManager.updateProduct(productId, updates)
    res.status(200).send({message: updateProduct})
  } catch (error) {
    console.error(error)
    res.status(400).send({message: `error al actualizar ru producto, verifica los valores enviados por body`})
  }
})


// Eliminar un producto específico
router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid)
  try {
    productManager.deleteProduct(productId)
    res.status(200).send({message: `Producto con id ${productId} ha sido eliminado`})
  } catch (error) {
    console.error(error)
    res.status(500).send({error: `Error al eliminar el producto con id ${productId}`})
  }
})

module.exports = router