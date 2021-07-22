const path = require("path")
const express = require("express")
const {config, engine} = require("express-edge")
const app = new express()
const rutasProtegidas = express.Router()
const conf = require("./configs/config")


const mysql = require('mysql2');

var conn = mysql.createConnection({host: "localhost", user: "cesar", password: 'cesar', database: 'cloud'});

// var conn = mysql.createConnection({host: "cloud-db1.mysql.database.azure.com", user: "itsadmin@cloud-db1", password: 'Its2017.', database: 'cloud', port: 3306});

conn.connect((error) => {
    if(error){
        throw error;
    }else{
        console.log('Conexion Exitosa!!');
    }
});
// conexion.end();

const bodyParser = require("body-parser")
const { Console } = require("console")

app.use(engine)
app.set('views', `${__dirname}/views`)
app.set('llave', conf.llave)

app.set('port', process.env.PORT || 3000)

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

var user = "";
app.get("/users", async (req, res) => {
    conn.query("select * from usuarios", (error, result, fields) => {
        if(error){
            throw error;
        }else{
            console.log(result)
            res.render("users", {
                result
            })
        }
    })
})

app.post("/autenticar", (req, res) => {
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
            else{
                const payload = {
                    check: true,
                    name: us.name,
                    lastName: us.lastName
                };
                const token = jwt.sign(payload, app.get('llave'), {
                    expiresIn: 5
                });
                // console.log('Autenticación correcta')
                res.render("main", {
                    token
                })
            }
        })
    })
})

app.get("/borrar/:id", async (req, res)=>{
    conn.query('delete from usuarios where id_user='+req.params.id, (error, result, field) => {
        if(error){
           throw error;
        }
        res.redirect("/users")
    })
})

app.get("/editar/:id", (req, res)=>{
    conn.query('select * from usuarios where id_user='+req.params.id, (error, result, field) => {
        if(error){
           throw error;
        }
        console.log(result)
        res.render("editar", {
            result
        })
    })
})

app.post("/registro/guardar", (req, res)=>{
    conn.query('insert into usuarios values(NULL,"'+req.body.name+'","'+req.body.lastName+'","'+req.body.email+'","'+req.body.phone+'","'+req.body.password+'")', (error, result, field) => {
        if(error){
           throw error;
        }
        res.redirect("/users")
    })
})

app.listen(app.get('port'), ()=>{
    console.log("El servidor esta corriendo en el puerto 3000")
})