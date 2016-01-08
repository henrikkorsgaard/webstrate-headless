module.exports = ( function () {
    'use strict';

    let WebSocket = require( 'ws' );
    let sjs = require( 'share' ).client;
    let jsonml = require("jsonml-tools");
    let jsdom = require("jsdom").jsdom;

    /*
        The client should provide a dom document like in a normal browser
        The webstrate.document is a skinned JSDOM
        It should be maintained / syncronies with websockets+sharejs

    */

    function WebstrateClient( webstrate, server, options ) {
        if ( !( this instanceof WebstrateClient ) ) {
            return new WebstrateClient( name, options );
        }
        let self = this;
        let ws;
        let sjsConnection;
        let sjsDoc;

        self.window = undefined;
        self.state = "READY";
        self.reconnectAttempts = false;

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
        /*
        function getShareJSDoc(){
            sjsConnection = new sjs.Connection(ws);
            sjsDoc = sjsConnection.get('webstrates', config.webstrate);
            sjsDoc.subscribe();
            sjsDoc.whenReady(function(){
                console.log("sjs document ready");
                let jsDOM = jsdom(jsonml.toXML(sjsDoc.snapshot), {});
                self.window = jsDOM.defaultView
                let test = self.window.document.getElementById('test');
                console.log(test.innerHTML);
            });
            sjsDoc.on('op', function(op){
                //TODO: handle ops
                console.log(op);
            });
        }
        */



        return self;
    }

    return WebstrateClient;

}() );
