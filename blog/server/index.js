const grpc  = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl.js');
const { BlogServiceService } = require('../proto/blog_grpc_pb');
const fs = require('fs/promises');
const { MongoClient } = require('mongodb');

const addr = 'localhost:50051';
const dbUrl = 'mongodb://root:root@localhost:27017';
const mongoClient = new MongoClient(dbUrl, { useUnifiedTopology: true });

global.collection = undefined;

async function cleanUp(server) {
    console.log('Cleaning up...');
        await mongoClient.close()
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

    await mongoClient.connect();
    const db = mongoClient.db('blog');
    global.collection = db.collection('blog');

    server.addService(BlogServiceService, serviceImpl);
    server.bindAsync(addr, creds, (err, _) => {
        if (err) {
            console.error(err);
            return cleanUp(server);
        }

        server.start();
    });

    console.log(`Server running at ${addr}`);
}

main().catch(err => {
    console.error(err);
    cleanUp()
});
