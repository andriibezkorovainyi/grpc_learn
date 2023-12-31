const grpc  = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl.js');
const { GreetServiceService } = require('../proto/greet_grpc_pb');
const fs = require('fs/promises');

const addr = 'localhost:50052';

function cleanUp(server) {
    console.log('Cleaning up...');

    server.forceShutdown();
}

async function main() {
    const TLS = true;
    const server = new grpc.Server();
    let creds;

    if (TLS) {
        const [rootCert, certChain, privateKey] = await Promise.all([
            fs.readFile('./ssl/ca.crt'),
            fs.readFile('./ssl/server.crt'),
            fs.readFile('./ssl/server.pem'),
        ])

        creds = grpc.ServerCredentials.createSsl(rootCert, [
            { cert_chain: certChain, private_key: privateKey },
        ]);
    } else {
        creds = grpc.ServerCredentials.createInsecure();
    }

    process.on('SIGINT', () => {
        console.log('Shutting down server...');
        cleanUp(server);
    });

    server.addService(GreetServiceService, serviceImpl);
    server.bindAsync(addr, creds, (err, _) => {
        if (err) {
            console.error(err);
            return cleanUp(server);
        }

        server.start();
    });

    console.log(`Server running at ${addr}`);
}

main();
