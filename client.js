const PROTO_PATH = __dirname + '/banco.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).banco;

const client = new protoDescriptor.ServicoBancario("127.0.0.1:50051", grpc.credentials.createInsecure());

// client.Saque({
//     valor: 100.0,
//     nomeCaixa: "Caixa SD"
// }, (err, response) => {
//     const transacao = response;

//     if(transacao.codigo === -1){
//         console.log("Operacao de saque falhou.");
//     } else{
//         console.log("Operacao de saque realizada com sucesso.")
//     }

//     console.log(transacao.codigo);
//     console.log(transacao.valor);
//     console.log(transacao.descricao);
//     console.log(transacao.data);
// });

// client.Deposito({
//     valor: 150.0,
//     nomeCaixa: "Caixa SD"
// }, (err, response) => {
//     const transacao = response;

//     console.log("Operacao de deposito realizada com sucesso.")

//     console.log(transacao.codigo);
//     console.log(transacao.valor);
//     console.log(transacao.descricao);
//     console.log(transacao.data);
// });

// client.Extrato({ }, (err, response) => {
//     const transacoes = response.transacoes;

//     console.log("Extrato");

//     for(i = 0; i < transacoes.length; i++){
//         const transacao = transacoes[i];

//         console.log(`${transacao.codigo} ${transacao.descricao}\t${transacao.data}  ${transacao.valor}`)
//     }

//     console.log("Fim");
// });

// client.Transferencia({
//     valor: 150.0,
//     nomeCaixa: "Caixa SD",
//     codigoConta: 123
// }, (err, response) => {
//     const transacao = response;

//     console.log("Operacao de transferência realizada.")

//     console.log(transacao.codigo);
//     console.log(transacao.valor);
//     console.log(transacao.descricao);
//     console.log(transacao.data);
// });

// client.Transferencia({
//     valor: -1500.0,
//     nomeCaixa: "Caixa SD",
//     codigoConta: 124
// }, (err, response) => {
//     const transacao = response;

//     console.log("Operacao de transferência realizada.")

//     console.log(transacao.codigo);
//     console.log(transacao.valor);
//     console.log(transacao.descricao);
//     console.log(transacao.data);
// });

// client.Compra({
//     valor: 900.0,
//     nomeEstabelecimento: "Supermercado"
// }, (err, response) => {
//     const transacao = response;

//     console.log("Operacao de compra realizada.")

//     console.log(transacao.codigo);
//     console.log(transacao.valor);
//     console.log(transacao.descricao);
//     console.log(transacao.data);
// });

client.Compra({
    valor: 1500.0,
    nomeEstabelecimento: "Supermercado"
}, (err, response) => {
    const transacao = response;

    console.log("Operacao de compra realizada.")

    console.log(transacao.codigo);
    console.log(transacao.valor);
    console.log(transacao.descricao);
    console.log(transacao.data);
});