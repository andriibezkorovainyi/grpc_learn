const grpc = require('@grpc/grpc-js');
const { CalculatorServiceClient } = require('../proto/calculator_grpc_pb');
const { SumRequest, PrimeNumberDecompositionRequest } = require('../proto/calculator_pb');

function doSum(client) {
    const req = new SumRequest().setA(10).setB(3)

    client.add(req, (err, res) => {
        if (err) {
            console.error(err);

            return;
        }

        console.log(`Sum: ${res.getResult()}`)
    })
}

function doPrimeNumberDecomposition(client) {
    const req = new PrimeNumberDecompositionRequest().setNumber(120);
    const call = client.primeNumberDecomposition(req);

    call.on('data', (res) => {
        console.log(`PrimeNumberDecomposition: ${res.getPrimeFactor()}`);
    });
}

function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient('localhost:50053', creds);

    // doSum(client);
    doPrimeNumberDecomposition(client);
    client.close();
}

main();
