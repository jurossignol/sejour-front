'use strict';

describe('Controller : NavbarController', function () {

	var $rootScope, $scope;

	beforeEach(function () {
		module('sejourFrontApp');

		inject(function ($controller, _$rootScope_) {
			$rootScope = _$rootScope_;
			$rootScope.userType = 'individual';
			$scope = $rootScope.$new();
		    
		    $controller('NavbarController', { $scope: $scope, ENV: 'prod' });
		});
	});

	it('Should be in production', function () {
	    expect($scope.inProduction).toBeTruthy();
	});

	it('Should not be authenticated at first time', function () {
	    expect($scope.isAuthenticated()).toBeFalsy();
	});

	it('Should save user type when choose new user type', function () {
	    $scope.choose('company');
	    
	    expect($rootScope.userType).toEqual('company');
	});
});