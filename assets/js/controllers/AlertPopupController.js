angular.module('BravChat')
	.controller('AlertPopupCtrl', ['$scope', '$timeout', '$uibModal', 'MediatorService',
				function($scope, $timeout, $uibModal, MediatorService){

		 $scope.alertPopup = function(size){	
					$scope.modalInstance = $uibModal.open({
						animation: true,
						templateUrl: 'AlertPopup.html',
						size: size,
						scope: $scope,
					});
					
					var alertPromise = $timeout($scope.alertPopup, 600000);
		  } 
		  $scope.alertPopup("md");
			
			
			//sails.controllers.Mediator.readDocFile();.
			MediatorService.readDocFile().then(function(value){
					$scope.consent  = value;
			});
			$scope.ok = function () {
					$scope.modalInstance.close($scope.consent);
			};

			$scope.cancel = function () {
				$scope.modalInstance.dismiss('cancel');
			};

  
		  
		  
}]);