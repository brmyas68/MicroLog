
const { Pool } = require("pg");

const connection =   new Pool({ 
    database:"DBLog",
    host:"localhost",
    port:5432,
    user: "postgres",
    password: "1234"
})
 
  
module.exports = connection;