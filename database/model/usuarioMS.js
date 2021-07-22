const mysql = require('mysql2');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'cloud',
    user: 'cesar@localhost',
    password: 'cesar'
})

conexion.connect((error) => {
    if(error){
        throw error;
    }else{
        console.log('Conexion Exitosa!!');
    }
});

var find = conexion.query("Select * from usuarios;");


conexion.end();

module.exports.Usuario = conexion;