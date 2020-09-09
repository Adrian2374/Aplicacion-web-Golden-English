const mongoose = require("mongoose")
const usuario = require("./database/model/usuario")
mongoose.connect("mongodb://localhost/Golden_2")

// usuario.findByIdAndUpdate("5f37373dd35d3e18efe2042c", {
//     name: "Cesar Adrian Cepeda",
//     password: "cesar12345"
// }, (error, us)=>{
//     console.log(error, us)
// })

// usuario.create({
//     name: "Cesar",
//     lastName: "Cepeda",
//     password: "jdjksksl",
//     phone: "456889"
// }, (error, us)=>{
//     console.log(error, us)
// })

// const u = usuario.findById("5f37373dd35d3e18efe2042c", {
    
// }, (error, us)=>{
//     console.log(error, us)
// })

usuario.findByIdAndUpdate('5f3c3c9cd8f9e60a71982b0c', {
    lastName: 'Martínez',
    password: 'cesar2374'
}, (error, us)=>{
    console.log(error, us)
    us.save()
    .then(() => {
        console.log("Guardado")
    })
    .catch((error)=>{
        console.log(error)
    })
})



