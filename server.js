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

const bd = {
  saldo: 1000.0,
  idTransacao: 0,
  transacoes: []
};

// The protoDescriptor object has the full package hierarchy
const servicoBancario = protoDescriptor.ServicoBancario;

const server = new grpc.Server();

//implementar o servico
server.addService(servicoBancario.service, {
  Extrato: function(call, callback) {
    callback(null, { transacoes: bd.transacoes })
  },
  Saque: function(call, callback) {
    const dadosOperacao = call.request;

    const valor = dadosOperacao.valor;
    const nomeCaixa = dadosOperacao.nomeCaixa;

    if(bd.saldo >= valor){
      bd.saldo -= valor;
      bd.idTransacao++;

      console.log("Saldo atual: "+ bd.saldo);

      const transacao = {
        codigo: bd.idTransacao,
        valor: valor,
        descricao: `Saque realizado no caixa ${nomeCaixa}`,
        data: Date.now().toString()
      }

      bd.transacoes.push(transacao);

      callback(null, transacao);
    } else {
      const transacao = {
        codigo: -1,
        valor: 0.0,
        descricao: `Tentativa de saque no caixa ${nomeCaixa}`,
        data: Date.now().toString()
      }
      
      callback(null, transacao);
    }
  },
  Deposito: function(call, callback) {
    const dadosOperacao = call.request;

    const valor = dadosOperacao.valor;
    const nomeCaixa = dadosOperacao.nomeCaixa;

      bd.saldo += valor;
      bd.idTransacao++;

      console.log("Saldo atual: "+ bd.saldo);

      const transacao = {
        codigo: bd.idTransacao,
        valor: valor,
        descricao: `Deposito realizado no caixa ${nomeCaixa}`,
        data: Date.now().toString()
      }

      bd.transacoes.push(transacao);

      callback(null, transacao);
  },
  Transferencia: function(call, callback) {},
  Compra: function(call, callback) {}
});

server.bindAsync("0.0.0.0:50051" ,grpc.ServerCredentials.createInsecure(), (error, port) => {
  console.log("Servidor gRPC rodando!");

  server.start();
});