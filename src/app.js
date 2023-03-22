const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const handlebars = require('express-handlebars')
const productManager = require('./productManager')
const routerProducts = require('./routers/routerProducts')(io)
const routerCarts = require('./routers/routerCarts')

//metodo que permite simular metodos http que no son permitidos en html
const methodOverride = require('method-override')


//middleware que procesa datos enviados desde el cuerpo de una solicitud http y convertirlos a objeto
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));


// middleware para manejar el método DELETE en solicitudes POST
app.use(methodOverride('_method'))


app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')

app.use(express.json())
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)


io.on('connection', (socket) => {
  socket.on('productos', () => {
    socket.emit('productos', productManager.getProducts())
  })
})

const puerto = 5550
http.listen(puerto, ()=>{
  console.log(`server running at port ${puerto}`)
})