'use strict';

describe('Controller : NavbarController', function () {

	var rootScope, scope, state, ENV;

	beforeEach(function () {
		// load the controller's module
		module('sejourFrontApp');

		// Initialize the controller and a mock scope
		inject(function ($controller, $rootScope, $state) {
			rootScope = $rootScope;
			rootScope.userType = 'individual';
			scope = rootScope.$new();
			state = $state;
		    $controller('NavbarController', {
		    	$rootScope: rootScope,
			    $scope: scope,
			    $state: state,
			    ENV: 'prod'
		    });
		});
	});

	it('should be in production', function () {
	    expect(scope.inProduction).toBeTruthy();
	});

	it('should not be authenticated at first time', function () {
	    expect(scope.isAuthenticated()).toBeFalsy();
	});

	it('should save user type and go to home when choose new user type', function () {
		spyOn(state, 'go');
	    scope.choose('company');
	    expect(rootScope.userType).toEqual('company');
	    expect(state.go).toHaveBeenCalledWith('home');
	});
});