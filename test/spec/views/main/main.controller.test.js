'use strict';

describe('Controller : MainController', function () {

	var $rootScope, $scope;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, _$rootScope_) {
			$rootScope = _$rootScope_;
			$rootScope.userType = 'individual';
			$scope = $rootScope.$new();
		    $controller('MainController', { $scope: $scope });
		});
	});

	it('Should save user type when choose new user type', function () {
	    $scope.choose('company');
	    expect($rootScope.userType).toEqual('company');
	});
});