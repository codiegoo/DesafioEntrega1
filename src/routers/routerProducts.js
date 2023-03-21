const { Router } = require('express')
const { string } = require('joi')
const productManager = require('../productManager')
const router = Router()




/**
 * {HANDLEBARS}
 */

module.exports = (io) => {
  // Permite crar un producto desde el body, siempre y cuando sea un objeto con todas sus propiedaddes adecuadas
router.post('/', (req, res) => {

  const {nombre, price, descripcion, stock, code, category, img} = req.body
  const status = req.body.status === 'on'

  console.log(nombre, price, descripcion, stock, code, category, img, status)

  const product = {
    "nombre":nombre,
    "descripcion":descripcion,
    "price":price,
    "stock":stock,
    "code":code,
    "category":category,
    "status":status,
    "img":img
  }
  console.log(product)
  try {
    productManager.addProduct(product)
    io.emit('productos', productManager.getProducts())
    res.status(201).redirect('back')
  } catch (error) {
    console.error(error)
    res.status(400).send({error:`error al crear el producto, verifica que sea un objeto y cuente con las claves y valores correctos`})
  }
})

// Muestra todos los productos existentes en el dom con handlebars
router.get('/', (req, res) => {
  const productsLim = parseInt(req.query.limit)
  try {
    const productos = productManager.getProducts(productsLim)
    res.status(200).render('home.handlebars', {productos: productos})
  } catch (error) {
    console.error(error)
    res.status(500).send({error:`error al cargar los productos`})
  }
})


//Muestra los productos en tiempo real
router.get('/realTimeProducts', (req, res) => {
  const productsLimite = parseInt(req.query.limit)
  try {
    const productos = productManager.getProducts(productsLimite)
    // Envía los productos a los clientes conectados
    io.emit('productos', productos)

    res.status(200).render('realTimeProducts.handlebars', {productos: productos})
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
    res.status(200).send({product: product})
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
    res.status(200).send({updateProduct: updateProduct})
    io.emit('productos', productManager.getProducts())
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
    io.emit('productos', productManager.getProducts())
  } catch (error) {
    console.error(error)
    res.status(500).send({error: `Error al eliminar el producto con id ${productId}`})
  }
})

return router
}