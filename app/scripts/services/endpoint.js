'use strict';

var endpointClient = angular.module('oauth.endpoint', []);

endpointClient.factory('Endpoint', function() {

  var service = {};

  /*
   * Defines the authorization URL
   */

  service.set = function(configuration) {
    this.config = configuration;
    return this.get();
  };

  /*
   * Returns the authorization URL
   */

  service.get = function( overrides ) {
    var params = angular.extend( {}, service.config, overrides);
    var oAuthScope = (params.scope) ? params.scope : '',
        state = (params.state) ? encodeURIComponent(params.state) : '',
        authPathHasQuery = (params.authorizePath.indexOf('?') == -1) ? false : true,
        appendChar = (authPathHasQuery) ? '&' : '?';    //if authorizePath has ? already append OAuth2 params

    var url = params.site +
          params.authorizePath +
          appendChar + 'response_type=' + params.responseType + '&' +
          'client_id=' + encodeURIComponent(params.clientId) + '&' +
          'redirect_uri=' + encodeURIComponent(params.redirectUri) + '&' +
          'scope=' + oAuthScope + '&' +
          'state=' + state;
    return url;
  };

  /*
   * Redirects the app to the authorization URL
   */

  service.redirect = function() {
    var targetLocation = this.get();
    window.location.replace(targetLocation);
  };

  return service;
});
