const fs = require('fs')

class CartManager{
  constructor(path){
    this.path = path
  }

  createCart(){
    const data = fs.readFileSync(this.path)
    const carts = JSON.parse(data)

    const id = carts.length + 1

    const newCart = {
      "id":id,
      "productos":[]
    }

    carts.push(newCart)
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2))

    console.log(`carrito ${id} creado`)
  }

  getCart(id){
    const cartsData = fs.readFileSync('./data/Carts.json')
    const carts = JSON.parse(cartsData)

    const cart = carts.find(c => c.id === id)
    return cart
  }


  addProductToCart(cid, pid){
    const data = fs.readFileSync('./data/Productos.json')
    const products = JSON.parse(data)
    const product = products.find(p => p.id === pid)

    if(!product){
      console.log(`el producto ${pid} no existe`)
      return
    }

    const cartsData = fs.readFileSync('./data/Carts.json')
    const carts = JSON.parse(cartsData)

    const cart = carts.find(c => c.id === cid)
    if(!cart){
      console.log(`el carrito ${cid} no existe`)
      return
    }

    const cartProductIndex = cart.productos.findIndex(p => p.product === pid)

    if(cartProductIndex !== -1){
      cart.productos[cartProductIndex].quantity++
    }else{
      cart.productos.push({
        product: pid,
        quantity: 1
      })
    }


    fs.writeFileSync('./data/Carts.json', JSON.stringify(carts))

    console.log(`el producto ${pid} se añadio al carrito ${cid} con exito`)
  }
}

const ruta = './data/Carts.json'
const cartManager = new CartManager(ruta)
module.exports = cartManager