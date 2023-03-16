const fs = require('fs')

class CartManager{
  constructor(path){
    this.path = path
    this.pathProducts = './data/Productos.json'
  }


  readJsonFile(filePath){
    try {
      const data = fs.readFileSync(filePath)
      return JSON.parse(data)
    } catch (error) {
      throw new Error(`error al leer el archivo`)
    }
  }

  createCart(){
    const carts = this.readJsonFile(this.path)

    let maxId = 0;
    for (const cart of carts) {
        if (cart.id > maxId) {
            maxId = cart.id;
        }
    }

    const newCart = {
      "id": maxId + 1,
      "productos":[]
    }

    carts.push(newCart)
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2))

    console.log(`carrito ${maxId + 1} creado`)
  }

  getCart(id){
    const cartsData = fs.readFileSync(this.path)
    const carts = JSON.parse(cartsData)

    const cart = carts.find(c => c.id === id)
    return cart
  }


  addProductToCart(cid, pid){
    const data = fs.readFileSync(this.pathProducts)
    const products = JSON.parse(data)
    const product = products.find(p => p.id === pid)

    if(!product){
      console.log(`el producto ${pid} no existe`)
      return
    }

    const cartsData = fs.readFileSync(this.path)
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


    fs.writeFileSync(this.path, JSON.stringify(carts))

    console.log(`el producto ${pid} se añadio al carrito ${cid} con exito`)
  }
}

const ruta = './data/Carts.json'
const cartManager = new CartManager(ruta)
module.exports = cartManager