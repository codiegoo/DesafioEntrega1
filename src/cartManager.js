const fs = require('fs')

class CartManager{
  constructor(path){
    this.path = path
    this.pathProducts = './data/Productos.json'
  }

  //metodo que lee un archivo JSON
  readJsonFile(filePath){
    try {
      const data = fs.readFileSync(filePath)
      return JSON.parse(data)
    } catch (error) {
      throw new Error(`error al leer el archivo: ${error.message}`)
    }
  }

  //metodo que crea un carrito
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

  //muestra un carrito segun su id
  getCart(id){
    const carts = this.readJsonFile(this.path)
    try {
      const cart = carts.find(c => c.id === id)
      return cart
    } catch (error) {
      throw new Error(`error al cargar el carrito ${id}: ${error.message}`)
    }
  }


  //agrega un producto a un carrito en especifico
  addProductToCart(cid, pid){
    //lee el archivo de productos y verifica que exista
    const products = this.readJsonFile(this.pathProducts)
    const product = products.find(p => p.id === pid)
    //lee el archivo de carritos y verifica que exista
    const carts = this.readJsonFile(this.path)
    const cart = carts.find(c => c.id === cid)
    //busca la propiedad productos del carrito y verifica si este ya existe dentro
    const cartProductIndex = cart.productos.findIndex(p => p.product === pid)

    try {
      if(!product){
        console.error(`el producto ${pid} no existe`)
        return
      }
      if(!cart){
        console.error(`el carrito ${cid} no existe`)
        return
      }
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
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`)
    }
  }
}

const ruta = './data/Carts.json'
const cartManager = new CartManager(ruta)
module.exports = cartManager