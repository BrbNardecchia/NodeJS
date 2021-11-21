//applicazione di gestione clienti da linea di comando
//node app.js get --nome='Gianluca'

const yargs = require('yargs'); 
const get = require('./cmd/get')
const add = require('./cmd/add')
const del = require('./cmd/del')

get(yargs) //ricerca cliente
add(yargs) //aggiunta cliente
del(yargs) //cancellazione cliente

yargs.parse();

