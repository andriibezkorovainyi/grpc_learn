const grpc = require('@grpc/grpc-js');
const { Blog, BlogId } = require('../proto/blog_pb');
const {ObjectId} = require("mongodb");
const {Empty} = require("google-protobuf/google/protobuf/empty_pb");

const internal = (error, callback) => callback({
    code: grpc.status.INTERNAL,
    message: error.message,
});

function checkNotAcknowledged(result, callback) {
    if (!result.acknowledged) {
        callback({
            code: grpc.status.INTERNAL,
            message: 'Operation not acknowledged',
        });
    }
}

function checkOID(id, callback) {
    try {
        return new ObjectId(id);
    } catch (e) {
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: e.message,
        });
    }
}

function checkNotFound(result, callback) {
    if (!result || result.matchedCount === 0 || result.deletedCount === 0) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: 'Blog not found',
        });
    }
}

function documentToBlog(blog) {
    const result = new Blog();
    result.setId(blog._id.toString());
    result.setAuthorId(blog.authorId);
    result.setTitle(blog.title);
    result.setContent(blog.content);

    return result;
}

function blogToDocument(blog) {
    return {
        authorId: blog.getAuthorId(),
        title: blog.getTitle(),
        content: blog.getContent(),
    };
}

exports.readBlog = async (call, callback) => {
    const oid = checkOID(call.request.getId(), callback);

    try {
        const blog = await collection.findOne({ _id: oid })
        checkNotFound(blog, callback);
        callback(null, documentToBlog(blog));
    } catch (e) {
        internal(e, callback);
    }
};

exports.createBlog = async (call, callback) => {
    const data = blogToDocument(call.request);
    await collection.insertOne(data).then((result) => {
        checkNotAcknowledged(result, callback);

        const id = result.insertedId.toString();
        const blogId = new BlogId().setId(id);

        callback(null, blogId);
    }).catch((error) => internal(error, callback));
};

exports.updateBlog = async (call, callback) => {
    const oid = checkOID(call.request.getId(), callback);

    try {
        const updatedBlog = await collection
            .updateOne(
              { _id: oid },
              { $set: blogToDocument(call.request) }
            )

        checkNotFound(updatedBlog, callback);
        checkNotAcknowledged(updatedBlog, callback);
        callback(null, new Empty());
    } catch (e) {
        internal(e, callback);
    }
};

exports.listBlog = async (call, _) => {
    try {
        (await collection
            .find()
            .toArray())
            .map(documentToBlog)
            .forEach((blog) => call.write(blog));

        call.end();
    } catch (e) {
        call.destroy({
            code: grpc.status.INTERNAL,
            message: e.message,
        })
    }
};

exports.deleteBlog = async (call, callback) => {
    const oid = checkOID(call.request.getId(), callback);

    try {
        const result = await collection.deleteOne({ _id: oid });
        checkNotFound(result, callback);
        checkNotAcknowledged(result, callback);
        callback(null, new Empty());
    } catch (e) {
        internal(e, callback);
    }
};
