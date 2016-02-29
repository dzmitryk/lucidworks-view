(function () {
  'use strict';

  angular
    .module('fusionSeedApp.services.link', [])
    .constant('BLANK_QUERY', blankQuery)
    .constant('QUERY_PARAM', 'query')
    .factory('LinkService', LinkService);

  var blankQuery = {
    q: '*:*',
    start: 0
  };

  function LinkService($log, $rison, $state, $location, QueryService, BLANK_QUERY,
    QUERY_PARAM) {
    'ngInject';
    return {
      setQuery: setQuery,
      getQueryFromUrl: getQueryFromUrl
    };

    function setQuery(queryObject) {
      QueryService.setQuery(queryObject);
      var queryObjectString = $rison.stringify(QueryService.getQueryObject());
      var newStateObject = {};
      newStateObject[QUERY_PARAM] = queryObjectString;
      $state.go('home', newStateObject, {notify: false});
    }

    function getQueryFromUrl() {
      var queryString = $location.search()[QUERY_PARAM];
      return queryString ? $rison.parse(queryString) : BLANK_QUERY;
    }
  }
})();