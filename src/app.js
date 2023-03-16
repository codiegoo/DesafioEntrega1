const express = require('express')
const app = express()
const routerProducts = require('./routers/routerProducts')
const routerCarts = require('./routers/routerCarts')


app.use(express.json())
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)


const port = 8080
app.listen(port, ()=>{
  console.log(`server running at port ${port}`)
})