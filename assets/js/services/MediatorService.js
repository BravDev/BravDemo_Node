angular.module('BravChat')
  .service('MediatorService', ['$http','$q',function($http, $q) {
  return {
    'readDocFile': function() {
      var defer = $q.defer();
      $http.get('/mediator/readDocFile').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}}]);