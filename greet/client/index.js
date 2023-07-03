const grpc = require('@grpc/grpc-js');
const { GreetServiceClient } = require('../proto/greet_grpc_pb');
const { GreetRequest } = require('../proto/greet_pb');

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

function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new GreetServiceClient('localhost:50052', creds);


    doGreet(client);
    doGreetManyTimes(client);
    client.close();
}

main();
