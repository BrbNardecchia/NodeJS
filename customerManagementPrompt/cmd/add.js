const fs = require('fs');
const chalk = require('chalk');
// const yargs = require('yargs'); 

function addCliente({ nome, email, telefono }) {
    const clientiJson = fs.readFileSync('./clienti.json', 'utf-8'),
          clienti = JSON.parse(clientiJson);
    clienti.push({nome,email,telefono});
    fs.writeFileSync('./clienti.json', JSON.stringify(clienti));
    console.log(clienti);
}

function add(yargs){
    yargs.command({ //definiamo comando: add
        command: 'add',
        describe: 'Aggiunta nuovo cliente',
        builder: {
            nome: {
                describe: 'Nome del cliente da aggiungere',
                demandOption: true, //true rende il flag obbligatorio
                type: 'string'
            },
            email: {
                describe: 'Email del cliente da aggiungere',
                demandOption: true, //true rende il flag obbligatorio
                type: 'string'
            },
            telefono: {
                describe: 'Telefono del cliente da aggiungere',
                demandOption: true, //true rende il flag obbligatorio
                type: 'string'
            }
        },
        handler(argv) {
            addCliente(argv);
        }
    });
}

module.exports = add;