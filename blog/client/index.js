
const grpc = require('@grpc/grpc-js');
const { BlogServiceClient } = require('../proto/blog_grpc_pb');
const fs = require('fs/promises');

async function main() {
    const TLS = true;
    const creds = TLS
        ? grpc.credentials.createSsl(await fs.readFile('./ssl/ca.crt'))
        : grpc.credentials.createInsecure();

    const client = new BlogServiceClient('localhost:50052', creds);

    client.close();
}

main();
