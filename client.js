/*
TODO:

1. make a websockets reconnect similar to https://github.com/joewalnes/reconnecting-websocket/blob/master/reconnecting-websocket.js
2. Listen on simple semantic evens.
*/


'use strict';
let WebstrateClient = require('./lib/WebstrateClient.js');

let client  = new WebstrateClient("test", {});

console.log(client.document);

/*
let WebSocket = require('ws');
let sharejs = require('share').client;

let username = 'web';
let password = 'strate';
let auth = 'Basic ' + new Buffer( username + ':' + password ).toString( 'base64' );
let wsHost = 'ws://webstrate.cs.au.dk/ws/';

var ws = new WebSocket(wsHost, {
  protocolVersion: 8,
  authentication: auth
});

var sjs = new sharejs.Connection(ws);


let doc = sjs.get('webstrates', 'helloworld');
sjs.debug = true
doc.subscribe();
doc.whenReady(function(){
    doc.on('op', function(op, context){
        console.log(op);
        console.log(context);
    });
    console.log(doc);
});

ws.on('close', function close() {
  var ws = new WebSocket(wsHost, {
    protocolVersion: 8,
    authentication: auth
  });
});


/*
So what I need in return is a webstrateDocument

*/
