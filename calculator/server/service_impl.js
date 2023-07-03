const pb = require('../proto/calculator_pb.js');

exports.sum = (call, callback) => {
    console.log('Calculator was invoked');
    const res = new pb.SumResponse()
        .setResult(call.request.getA() + call.request.getB());

    callback(null, res);
};

exports.primeNumberDecomposition = (call, _) => {
    console.log('PrimeNumberDecomposition was invoked');

    let k = 2;
    let n = call.request.getNumber();

    while (n > 1) {
        if (n % k === 0) {
            const res = new pb.PrimeNumberDecompositionResponse()
                .setPrimeFactor(k);

            call.write(res);

            n = n / k;
        } else {
            k++;
        }
    }

    call.end();
};
