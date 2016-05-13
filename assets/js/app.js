'use strict';

var notesApp = angular.module('BravChat', []);

notesApp.controller('NotesCtrl', ['$scope', '$rootScope', 'NotesService', function($scope, $rootScope, NotesService) {
  $scope.formData = "";
  $scope.notes = [];
  $scope.isChecked = false;

  NotesService.getNotes().then(function(response) {
    $scope.notes=[];
    $scope.noteId=[];
    
    for(var i=1; i< response.length; i++) {
      $scope.notes.push(response[i].value);
    }
       
  });

  $scope.addNotes = function() {
    NotesService.addNotes($scope.formData).then(function(response) {
       
      $scope.notes.push($scope.formData);
      $scope.formData = "";
    });
  }

  $scope.removeNotes = function() {
     var note ="";
       $('.notesCheckbox').each(function(){
           debugger;
         if( $(this).is(':checked')) {
          note = $(this).parent()[0].innerText;
          //note.trim();
          var trimNote = note.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
           NotesService.removeNotes(trimNote).then(function(response) {
            debugger;
            $scope.notes.splice($scope.notes.indexOf(trimNote), 1)
          });
         }
       })
    
   
  }
}]);