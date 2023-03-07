const express = require('express');
//const usuarioRoutes = require('./routes/usuarioRoutes.js')

//const router = express.Router();

const app = express()

app.get('/', function(req, res){
    //res.json({msg: "a"})
    res.send("a")
})


app.set('view engine', 'pug')
app.set('views', './views')

//app.use('/', usuarioRoutes)

const port = 3010;
app.listen(port, () => {
    console.log(':)')
})

