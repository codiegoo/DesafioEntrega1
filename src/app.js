const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')


const handlebars = require('express-handlebars')
const productManager = require('./productManager')
const routerProducts = require('./routers/routerProducts')(io)
const routerCarts = require('./routers/routerCarts')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')

app.use(express.json())
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)


io.on('connection', (socket) => {
  console.log('usuario conectado')

  socket.on('productos', () => {
    console.log('Productos resividos del servidor')
    socket.emit('productos', productManager.getProducts())
  })

  socket.on('disconnect', () => {
    console.log('usuario desconectado')
  })
})

const puerto = 5550
http.listen(puerto, ()=>{
  console.log(`server running at port ${puerto}`)
})