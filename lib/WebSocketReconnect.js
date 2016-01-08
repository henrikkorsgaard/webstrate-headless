module.exports = ( function () {
    'use strict';

    let WebSocket = require( 'ws' );
    let EventEmitter = require('events').EventEmitter;

    function WebsocketReconnect(host, options ) {
        if ( !( this instanceof WebsocketReconnect ) ) {
            return new WebstrateClient( host, options );
        }
        let self = this;
        let ws;


        self.state = "READY";
        self.reconnectAttempts = false;
        EventEmitter.call(this);

        /**
          * Inherits from EventEmitter.
        */
        util.inherits(WebsocketReconnect, EventEmitter);

        // Default settings
        let config = {
            authentication: false,
            reconnectInterval: 1000,
            maxReconnectInterval: 30000,
            reconnectDecay: 1.5,
            timeoutInterval: 2000,
            maxReconnectAttempts: null,
            wsOptions: {
                protocolVersion: 13
            }
        }

        if ( !options ) {
            options = {};
        }

        for ( let key in config ) {
            if ( typeof options[ key ] !== 'undefined' ) {
                config[ key ] = options[ key ];
            }
        }

        if ( config.authentication && config.hasOwnProperty( 'login' ) && config.hasOwnProperty( 'password' ) ) {
            wsOptions.autentication = 'Basic ' + new Buffer( config.login + ':' + config.password ).toString( 'base64' );
        }

        function open(reconnectAttempts){
          ws = new WebSocket(config.wsHost, config.wsOptions);
          self.state = WebSocket.CONNECTING;

          let timeout = setTimeout(function() {
              ws.close();
          }, config.timeoutInterval);

          ws.on( 'open', function () {
              self.emit('open')
              clearTimeout(timeout);
              self.state = WebSocket.OPEN;
          } );

          ws.on( 'error', function ( err ) {
              clearTimeout(timeout);
              self.state = WebSocket.CLOSED;
              console.log( err );
          } );

          ws.on( 'close', function close( code, reason ) {
              clearTimeout(timeout);
              self.state = WebSocket.CLOSED;
              console.log( "closing" );
              ws = null;
              setTimeout( function () {
                  self.reconnectAttempts++;
                  open();
              }, config.reconnectInterval );
          } );
        }

        open();

        return self;
    }

    return WebsocketReconnect;

}() );
