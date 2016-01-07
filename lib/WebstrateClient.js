module.exports = (function(){
  'use strict';

  function WebstrateClient(name, options) {
     if ( !( this instanceof WebstrateClient ) ) {
         return new WebstrateClient( name, options );
     }

     let self = this;
     self.document = "testing"
     self.state = "READY";
     return self;
  }

 return WebstrateClient;

}());
