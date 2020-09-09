const bcrypt = require("bcrypt-nodejs")
const mongoose = require("mongoose")
const schema = mongoose.Schema

const usuarioSchema = new schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    password: {type: String, required: true}
}, {
    timestamps: true
})



usuarioSchema.pre("save", function(next){
    const usuario = this
 
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            next(err)
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if(err){
                next(err)
            }
            usuario.password = hash
            next()
        })
    })
})

usuarioSchema.methods.compararPassword = function pass(password, cb) {
    bcrypt.compare(password, this.password, (err, sonIguales) => {
        if(err){
            return cb(err)
        }
        cb(null, sonIguales)
    })
}

module.exports = mongoose.model("Usuario", usuarioSchema)