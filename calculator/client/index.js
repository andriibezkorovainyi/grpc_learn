const grpc = require('@grpc/grpc-js');
const { CalculatorServiceClient } = require('../proto/calculator_grpc_pb');
const { SumRequest, PrimeNumberDecompositionRequest, AverageRequest, FindMaximumRequest } = require('../proto/calculator_pb');

function doSum(client) {
    const req = new SumRequest().setA(10).setB(3)
    console.log(req);

    client.sum(req, (err, res) => {
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

function doAverage(client) {
    console.log('doAverage invoked');
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const call = client.average((err, res) => {
        if (err) {
            return console.log(err);
        }

        console.log(`Average number is - ${res.getAverage()}`)
    })

    const requests = numbers
        .map(num => new AverageRequest().setNumber(num));

    requests.forEach(req => call.write(req));

    call.end();
}

function doFindMaximum(client) {
    console.log('doFindMaximum invoked');
    const numbers = [1, 5, 3, 6, 2, 20];

    const call = client.findMaximum();

    call.on('data', (res) => {
        console.log(`Maximum number is - ${res.getMaximum()}`)
    })

    call.on('error', (err) => {
        console.log(err)
    })

    numbers
        .map(num => new FindMaximumRequest().setNumber(num))
        .forEach(req => call.write(req));
    call.end();
}

function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient('localhost:50053', creds);

    // doSum(client.js);
    // doPrimeNumberDecomposition(client.js);
    // doAverage(client.js);
    doFindMaximum(client);
    client.close();
}

main();
