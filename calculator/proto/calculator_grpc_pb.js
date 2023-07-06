// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var calculator_pb = require('./calculator_pb.js');

function serialize_calculator_AverageRequest(arg) {
  if (!(arg instanceof calculator_pb.AverageRequest)) {
    throw new Error('Expected argument of type calculator.AverageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_AverageRequest(buffer_arg) {
  return calculator_pb.AverageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_AverageResponse(arg) {
  if (!(arg instanceof calculator_pb.AverageResponse)) {
    throw new Error('Expected argument of type calculator.AverageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_AverageResponse(buffer_arg) {
  return calculator_pb.AverageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FindMaximumRequest(arg) {
  if (!(arg instanceof calculator_pb.FindMaximumRequest)) {
    throw new Error('Expected argument of type calculator.FindMaximumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FindMaximumRequest(buffer_arg) {
  return calculator_pb.FindMaximumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FindMaximumResponse(arg) {
  if (!(arg instanceof calculator_pb.FindMaximumResponse)) {
    throw new Error('Expected argument of type calculator.FindMaximumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FindMaximumResponse(buffer_arg) {
  return calculator_pb.FindMaximumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeNumberDecompositionRequest(arg) {
  if (!(arg instanceof calculator_pb.PrimeNumberDecompositionRequest)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionRequest(buffer_arg) {
  return calculator_pb.PrimeNumberDecompositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeNumberDecompositionResponse(arg) {
  if (!(arg instanceof calculator_pb.PrimeNumberDecompositionResponse)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionResponse(buffer_arg) {
  return calculator_pb.PrimeNumberDecompositionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof calculator_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return calculator_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof calculator_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return calculator_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  sum: {
    path: '/calculator.CalculatorService/Sum',
    requestStream: false,
    responseStream: false,
    requestType: calculator_pb.SumRequest,
    responseType: calculator_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  primeNumberDecomposition: {
    path: '/calculator.CalculatorService/PrimeNumberDecomposition',
    requestStream: false,
    responseStream: true,
    requestType: calculator_pb.PrimeNumberDecompositionRequest,
    responseType: calculator_pb.PrimeNumberDecompositionResponse,
    requestSerialize: serialize_calculator_PrimeNumberDecompositionRequest,
    requestDeserialize: deserialize_calculator_PrimeNumberDecompositionRequest,
    responseSerialize: serialize_calculator_PrimeNumberDecompositionResponse,
    responseDeserialize: deserialize_calculator_PrimeNumberDecompositionResponse,
  },
  average: {
    path: '/calculator.CalculatorService/Average',
    requestStream: true,
    responseStream: false,
    requestType: calculator_pb.AverageRequest,
    responseType: calculator_pb.AverageResponse,
    requestSerialize: serialize_calculator_AverageRequest,
    requestDeserialize: deserialize_calculator_AverageRequest,
    responseSerialize: serialize_calculator_AverageResponse,
    responseDeserialize: deserialize_calculator_AverageResponse,
  },
  findMaximum: {
    path: '/calculator.CalculatorService/FindMaximum',
    requestStream: true,
    responseStream: true,
    requestType: calculator_pb.FindMaximumRequest,
    responseType: calculator_pb.FindMaximumResponse,
    requestSerialize: serialize_calculator_FindMaximumRequest,
    requestDeserialize: deserialize_calculator_FindMaximumRequest,
    responseSerialize: serialize_calculator_FindMaximumResponse,
    responseDeserialize: deserialize_calculator_FindMaximumResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
