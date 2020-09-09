const path = require("path")
const express = require("express")
const {config, engine} = require("express-edge")
const app = new express()
const mongoose = require("mongoose")
const Usuario = require("./database/model/usuario")
mongoose.connect("mongodb://localhost/Golden_2")

const bodyParser = require("body-parser")

app.use(engine)
app.set('views', `${__dirname}/views`)

app.use('/css',express.static(__dirname +'/css'));
app.use('/dynamic', express.static(__dirname+'/dynamic'))
app.use('/imagenes', express.static(__dirname+'/imagenes'))
app.use('/sub_pages/registry/css',express.static(__dirname +'/sub_pages/registry/css'));
app.use('/sub_pages/contact/css',express.static(__dirname +'/sub_pages/contact/css'));
app.use('/sub_pages/about/css',express.static(__dirname +'/sub_pages/about/css'));
app.use('/sub_pages/users/css',express.static(__dirname +'/sub_pages/users/css'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "main.html"))
    res.render('main')
})

app.get("/registro", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "sub_pages/registry/registro.html"))
    res.render('registry')
})

app.get("/contacto", (req, res) => {
    res.render("contact")
})


app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/users", async (req, res) => {
    const usuarios = await Usuario.find({})
    res.render("users", {
        usuarios
    })
})

app.post("/iniciar", (req, res) => {
    // console.log(req.body.email)
    // console.log(req.body.password)
    Usuario.findOne({
        email: req.body.email,
    }, (error, us) => {
        if(us === null){
            return console.log("El correo esta mal")
            // res.render()
        }

        us.compararPassword(req.body.password, (error, sonIguales) => {
            if(!sonIguales){
                console.log("La contraseña es incorrecta");
                return res.render("main");
            }
            console.log("Usuario existe");
        })
        
        // Usuario.findOne({
        //     email: req.body.email,
        //     password: req.body.password
        // }, (err, usuario) => {
        //     if(usuario === null){
        //         return console.log("La contraseña esta mal")
        //     }
        //     console.log("Usuario existe")
        //     res.render("main")
        // }) 
    })
})

app.get('/users/detalles/:id', async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)

    // console.log(usuario)
    res.render("/users/details", {
        usuario
    })
})

app.post("/registro/guardar", (req, res)=>{
    Usuario.create(req.body, (error, us) => {
        if(error){
           return console.log("El correo ingresado ya esta registrado")
        }
        res.redirect("/")
    })
})


app.listen(3000, ()=>{
    console.log("El servidor esta corriendo en el puerto 3000")
})