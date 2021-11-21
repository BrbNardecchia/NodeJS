const fs = require('fs');
const chalk = require('chalk');
// const yargs = require('yargs'); 

function removeCliente(nome){
    const clientiJson = fs.readFileSync('./clienti.json', 'utf-8'),
          clienti = JSON.parse(clientiJson),
          clienteIndex = clienti.findIndex(cliente => cliente.nome === nome);
    if(clienteIndex === -1){
        console.log('cliente not found');
        return;
    }
    clienti.splice(clienteIndex, 1);
    fs.writeFileSync('./clienti.json', JSON.stringify(clienti));
    console.log(clienti);

}

function del(yargs){
    yargs.command({ //definiamo comando: removeByName
        command: 'del', 
        describe: 'Rimozione di un cliente per nome', 
        builder: {
            nome: {
                describe: 'Nome del cliente da rimuovere',
                demandOption: true, //true rende il flag obbligatorio
                type: 'string'
            }
        },
        handler(argv) {
            removeCliente(argv.nome);
        }
    })
}

module.exports = del;