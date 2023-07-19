const grpc = require('@grpc/grpc-js');
const { GreetServiceClient } = require('../proto/greet_grpc_pb');
const { GreetRequest } = require('../proto/greet_pb');
const fs = require('fs/promises');

function doGreet(client) {
    console.log('doGreet is invoked');

    const req = new GreetRequest().setName('John');

    client.greet(req, (err, res) => {
        if (err) {
            console.error(err);

            return;
        }

        console.log(`Greet: ${res.getGreeting()}`)
    });
}

function doGreetManyTimes(client) {
    console.log('doGreetManyTimes is invoked');

    const req = new GreetRequest().setName('John');
    const call = client.greetManyTimes(req);

    call.on('data', (res) => {
        console.log(`GreetManyTimes: ${res.getGreeting()}`);
    });
}

function doGreetEveryone(client) {
    console.log('doGreetEveryone is invoked');
    const names = ['John', 'Jane', 'Doe'];
    const call = client.greetEveryone();

    call.on('data', (res) => {
        console.log(`GreetEveryone: ${res.getGreeting()}`);
    });

    call.on('end', () => {
        console.log('Server has ended the request');
    });

    call.on('error', (err) => {
        console.error(err);
    });

    call.on('status', (status) => {
        console.log(status);
    });

    names.map((name) => {
        const req = new GreetRequest().setName(name);

        return req;
    }).forEach((req) => {
        call.write(req);
    });

    call.end();
}

function doGreetWithDeadline(client, n) {
    const request = new GreetRequest().setName('John');
    const deadline = new Date(Date.now() + n);

    client.greetWithDeadline(request, { deadline }, (err, res) => {
        if (err) {
            console.error(err);

            return;
        }

        console.log(`GreetWithDeadline: ${res.getGreeting()}`);
    });
}

async function main() {
    const TLS = true;
    const creds = TLS
        ? grpc.credentials.createSsl(await fs.readFile('./ssl/ca.crt'))
        : grpc.credentials.createInsecure();

    const client = new GreetServiceClient('localhost:50052', creds);


    doGreet(client);
    // doGreetManyTimes(client.js);
    // doGreetEveryone(client.js);
    // doGreetWithDeadline(client.js, 5000);
    client.close();
}

main();
