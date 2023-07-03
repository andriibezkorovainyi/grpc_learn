const grpc  = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl.js');
const { GreetServiceService } = require('../proto/greet_grpc_pb');

const addr = 'localhost:50052';

function cleanUp(server) {
    console.log('Cleaning up...');

    server.forceShutdown();
}

function main() {
    const server = new grpc.Server();
    const creds = grpc.ServerCredentials.createInsecure();

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
