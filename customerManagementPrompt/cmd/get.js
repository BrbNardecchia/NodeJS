const fs = require('fs');
const chalk = require('chalk');
// const yargs = require('yargs'); 

function getCliente(nome) {
    const clientiJson = fs.readFileSync('./clienti.json', 'utf-8'),
          clienti = JSON.parse(clientiJson),
          cliente = clienti.find(clienteItem => clienteItem.nome === nome),
          ris = { status: false, suggerimenti: '', cliente: null };
    if (!cliente) {
        clienti.map(clienteItem => {
            if (clienteItem.nome[0] === nome[0]) {
                ris.suggerimenti += `${clienteItem.nome} `;
            }
        });
        return ris;
    }
    ris.status = true;
    ris.cliente = cliente;
    return ris;
}

function get(yargs){
    yargs.command({ //definiamo il primo comando: get
        command: 'get',
        describe: 'ricerca cliente in base al nome',
        builder: { //indica i flag che ci aspettiamo nel comando get
            nome: {
                describe: 'Nome del cliente da ricercare',
                demandOption: true, //true rende il flag obbligatorio
                type: 'string'
            }
        },
        handler(argv) {
            const ris = getCliente(argv.nome);
            if (ris.status) {
                console.log(chalk.green.bold('Cliente trovato: '));
                console.log(ris.cliente)
            }
            else {
                console.log(chalk.red.bold('Cliente non trovato. Forse cercavi ') + ris.suggerimenti);
            }
    
        }
    });
}

module.exports = get;