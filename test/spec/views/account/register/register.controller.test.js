'use strict';

describe('Controller : RegisterController', function () {

	var $scope;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, $rootScope, $translate) {

			$rootScope.userType = 'individual';
			$scope = $rootScope.$new();

			spyOn($translate, 'use').and.returnValue('fr');

		    $controller('RegisterController', { $scope: $scope });
		});
	});

	it('Should have user type predefined when exists', function () {
		expect($scope.registerAccount.type).toEqual('individual');
	});

	it('Should not match when different password', function () {
		$scope.registerAccount.password = 'myPassword';
		$scope.confirmPassword = 'otherPassword';
		
		$scope.register();
		
		expect($scope.doNotMatch).toEqual('ERROR');
	});

	it('Should register when correct password', function () {
		$scope.registerAccount.password = 'myPassword';
		$scope.confirmPassword = 'myPassword';
		
		$scope.register();
		
		expect($scope.doNotMatch).toBeNull();
		expect($scope.registerAccount.langKey).toEqual('fr');
	});
});