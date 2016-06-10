angular.module('BravChat')
  .service('NotesService', ['$http','$q',function($http, $q) {
  return {
    'getNotes': function() {
      var defer = $q.defer();
      $http.get('/notes/getNotes').success(function(resp){
        
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addNotes': function(notes) {
      debugger;
      var defer = $q.defer();
      $http.post('/notes/addNotes',{value : notes}).success(function(resp){
        debugger;
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'removeNotes': function(notes) {
      var defer = $q.defer();
      $http.post('/notes/removeNotes', {value : notes}).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}}]);