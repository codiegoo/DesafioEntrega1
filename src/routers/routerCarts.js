const { Router } = require('express')
const cartManager = require('../cartManager')
const router = Router()

// Permite crear un carrito vacio
router.post('/', (req, res) => {
  try {
    cartManager.createCart()
    res.status(201).send({message: 'carrito creado con exito'})
  } catch (error) {
    console.error(error)
    res.status(500).send({message: 'error al crear nuevo carrito'})
  }
})

// Muestra un carrito en particular
router.get('/:cid', (req, res) => {
  const cid = parseInt(req.params.cid)
  try {
    const cart = cartManager.getCart(cid)
    res.status(200).send({message: `carrito ${cid} cargado con exito`,
                          carrito: cart})
  } catch (error) {
    console.error(error)
    res.status(400).send({message: `carrito ${cid} no encontrado`})
  }
})

router.post('/:cid/product/:pid', (req, res) => {
  const cid = parseInt(req.params.cid)
  const pid = parseInt(req.params.pid)

  try {
    cartManager.addProductToCart(cid, pid)
    res.status(200).send({message: `producto ${pid} agregado al carrito ${cid} con exito`})
  } catch (error) {
    console.error(error)
    res.status(404).send({message: `error al agregar tu producto, verifica que el producto o el carrito exista`})
  }
})

module.exports = router