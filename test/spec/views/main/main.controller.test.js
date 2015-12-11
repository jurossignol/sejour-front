'use strict';

describe('Controller : MainController', function () {

	var $rootScope, $scope;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, $injector) {
			$rootScope = $injector.get('$rootScope');
			$rootScope.userType = 'individual';
			$scope = $rootScope.$new();
		    $controller('MainController', { $rootScope: $rootScope, $scope: $scope });
		});
	});

	it('should save user type when choose new user type', function () {
	    $scope.choose('company');
	    expect($rootScope.userType).toEqual('company');
	});
});