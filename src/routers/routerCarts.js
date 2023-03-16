const { Router } = require('express')
const cartManager = require('../cartManager')
const router = Router()


router.post('/', (req, res) => {
  try {
    cartManager.createCart()
  } catch (error) {
    res.send(error)
  }

})

router.get('/:cid', (req, res) => {
  const cid = parseInt(req.params.cid)
  try {
    const method = cartManager.getCart(cid)
    res.send({carrito: method})
  } catch (error) {
    res.json(error)
  }
})

router.post('/:cid/product/:pid', (req, res) => {
  const cid = parseInt(req.params.cid)
  const pid = parseInt(req.params.pid)

  try {
    cartManager.addProductToCart(cid, pid)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router  