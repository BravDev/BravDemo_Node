/**
 * RoutesConfig.js
 *
 * @description :: Routing configuration to navigate. 
 */

angular.module('BravChat')
	.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/mediator');

    $stateProvider
		.state('mediator', { 
			url: '/mediator/:id',
            templateUrl: 'index.html',
            controller: '',
            controllerAs: ''
        });
}]);