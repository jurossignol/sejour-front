'use strict';

describe('Controller : RegisterController', function () {

	var $scope;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, $rootScope) {

			$rootScope.userType = 'individual';
			$scope = $rootScope.$new();

		    $controller('RegisterController', {
		    	$rootScope: $rootScope,
		    	$scope: $scope,
		    	$translate: {use: function () { return 'fr'; }}
		    });
		});
	});

	it('should be individual user type', function () {
		expect($scope.registerAccount.type).toEqual('individual');
	});

	it('should not match when different password', function () {
		$scope.registerAccount.password = 'myPassword';
		$scope.confirmPassword = 'otherPassword';
		$scope.register();
		expect($scope.doNotMatch).toEqual('ERROR');
	});

	it('should register when correct password', function () {
		$scope.registerAccount.password = 'myPassword';
		$scope.confirmPassword = 'myPassword';
		$scope.register();
		expect($scope.doNotMatch).toBeNull();
		expect($scope.registerAccount.langKey).toEqual('fr');
	});
});