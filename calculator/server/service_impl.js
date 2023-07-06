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

exports.average = (call, callback) => {
    console.log('Average was invoked');
    const numbers = [];

    call.on('data', (req) => {
        numbers.push(req.getNumber())
    })

    console.log('Finished streaming');

    call.on('end', () => {
        const average = numbers.reduce((a, b) => a + b) / numbers.length;
        const res = new pb.AverageResponse()
            .setAverage(average);

        console.log('response: ', res)
        callback(null, res)
        console.log('DONE')
    })
}

exports.findMaximum = (call) => {
    const numbers = [];

    call.on('data', (req) => {
        const incomeNumber = req.getNumber();
        numbers.push(incomeNumber);

        if (incomeNumber === Math.max(...numbers)) {
            call.write(new pb.FindMaximumResponse().setMaximum(incomeNumber));
        }
    });

    call.on('end', () => {
        call.end();
    });
}
