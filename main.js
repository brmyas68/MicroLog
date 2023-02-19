
'use strict';
const PROTO_PATH = './pb/log.proto';
const PORT = 8000;

var  pbLogService = require("./pb/pbLogService")
var  protoLoader = require('@grpc/proto-loader');
var  grpc = require('@grpc/grpc-js');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
 
const    packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const    protoDescriptor   = grpc.loadPackageDefinition(packageDefinition);
const    protologservice   = protoDescriptor.protoLogService;

const server = new grpc.Server();

server.addService(protologservice.LogService.service, {
    Insert     : pbLogService.Insert,
    GetByWhere : pbLogService.GetByWhere
});
 
 
server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log( `Server running at  127.0.0.1:${PORT}` );
    server.start();
  });