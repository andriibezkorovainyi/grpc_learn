
const grpc = require('@grpc/grpc-js');
const { BlogServiceClient } = require('../proto/blog_grpc_pb');
const fs = require('fs/promises');
const {Blog, BlogId} = require('../proto/blog_pb');
const {ObjectId} = require("mongodb");
const {Empty} = require("google-protobuf/google/protobuf/empty_pb");

function createBlog(client) {
    console.log('createBlog is invoked');

    return new Promise((resolve, reject) => {
        const blog = new Blog();
        blog.setAuthorId('1');
        blog.setTitle('Hello World');
        blog.setContent('This is my first blog post!');

        client.createBlog(blog, (err, res) => {
            if (err) {
                reject(err);
            }

            console.log(`Blog created with id: ${res.getId()}`);
            resolve(res.getId());
        });
    });
}

async function readBlog(client, blogId) {
    console.log('readBlog is invoked');

    return new Promise((resolve, reject) => {
        const blogIdObj = new BlogId();
        blogIdObj.setId(blogId);

        client.readBlog(blogIdObj, (err, res) => {
            if (err) {
                reject(err);
            }

            console.log(`Blog read with id: ${res.getId()}`);
            resolve(res);
        });
    });
}

async function updateBlog(client, blogId) {
    console.log('updateBlog is invoked');

    return new Promise((resolve, reject) => {
        const blog = new Blog();
        blog.setId(blogId);
        blog.setAuthorId('2');
        blog.setTitle('Hello World(updated)');
        blog.setContent('This is my first blog post!(updated)');

        client.updateBlog(blog, (err, _) => {
            if (err) {
                reject(err);
            }

            console.log(`Blog updated with id: ${blogId}`);
            resolve();
        });
    });
}

async function listBlog(client) {
   const req = new Empty();
    const call = await client.listBlog(req);

    call.on('data', (res) => {
        console.log(res.toString());
    });

    call.on('end', () => {
        console.log('Server done');
    });

    call.on('error', (err) => {
        console.error(err);
    });
}

async function deleteBlog(client, blogId) {
    console.log('deleteBlog is invoked');

    return new Promise((resolve, reject) => {
        const blogIdObj = new BlogId();
        blogIdObj.setId(blogId);

        client.deleteBlog(blogIdObj, (err, _) => {
            if (err) {
                reject(err);
            }

            console.log(`Blog deleted with id: ${blogId}`);
            resolve();
        });
    });
}

async function main() {
    const TLS = true;
    const creds = TLS
        ? grpc.credentials.createSsl(await fs.readFile('./ssl/ca.crt'))
        : grpc.credentials.createInsecure();

    const client = new BlogServiceClient('localhost:50051', creds);

    const blogId = await createBlog(client);
    await readBlog(client, blogId);
    await updateBlog(client, blogId);
    await listBlog(client);
    await deleteBlog(client, blogId);

    client.close();
}

main();
