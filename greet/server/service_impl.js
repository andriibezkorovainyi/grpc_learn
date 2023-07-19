const pb = require('../proto/greet_pb');

exports.greet = (call, callback) => {
    console.log('Greet was invoked');
    const res = new pb.GreetResponse()
        .setGreeting(`Hello, ${call.request.getName()}`);

    callback(null, res);
};

exports.greetManyTimes = (call, _) => {
    console.log('GreetManyTimes was invoked');

    const res = new pb.GreetResponse();

    for (let i = 0; i < 10; ++i) {
        res.setGreeting(`Hello, ${call.request.getName()} - number ${i}`);
        call.write(res);
    }

    call.end();
};

exports.greetEveryone = (call) => {
    console.log('GreetEveryone was invoked');

    call.on('data', (req) => {
        const res = new pb.GreetResponse()
            .setGreeting(`Hello, ${req.getName()}`);

        call.write(res);
    });

    call.on('end', () => {
        console.log('Client has ended the request');
        call.end();
    });
}

exports.greetWithDeadline = async (call, callback) => {
    console.log('GreetWithDeadline was invoked');
    const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for await (let i of [1, 2, 3]) {
        if (call.cancelled) {
            console.log('The client.js has cancelled the request');
            return;
        }

        await sleep(1000);
    }

    const res = new pb.GreetResponse()
        .setGreeting(`Hello, ${call.request.getName()}`);

    callback(null, res);
};
