'use strict';

describe('Controller : NavbarController', function () {

	var $rootScope, $scope, $state;

	beforeEach(function () {
		// load the controller's module
		module('sejourFrontApp');

		// Initialize the controller and a mock scope
		inject(function ($controller, _$rootScope_, _$state_) {
			$rootScope = _$rootScope_;
			$rootScope.userType = 'individual';
			$scope = $rootScope.$new();
			$state = _$state_;
		    
		    $controller('NavbarController', { $scope: $scope, ENV: 'prod' });
		});
	});

	it('Should be in production', function () {
	    expect($scope.inProduction).toBeTruthy();
	});

	it('Should not be authenticated at first time', function () {
	    expect($scope.isAuthenticated()).toBeFalsy();
	});

	it('Should save user type and go to home when choose new user type', function () {
		spyOn($state, 'go');
	    
	    $scope.choose('company');
	    
	    expect($rootScope.userType).toEqual('company');
	    expect($state.go).toHaveBeenCalledWith('home');
	});
});