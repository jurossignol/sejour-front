'use strict';

describe('Controller : RegisterController', function () {

	var $httpBackend, $q, $scope, AuthService;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, _$httpBackend_, _$q_, $rootScope, $translate, _AuthService_) {

			$q = _$q_;
			$rootScope.userType = 'individual';
			$scope = $rootScope.$new();
			AuthService = _AuthService_;

			spyOn($translate, 'use').and.returnValue('fr');
			spyOn(AuthService, 'createAccount').and.returnValue($q.when({}));

		    $controller('RegisterController', { $scope: $scope });

            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET(new RegExp('i18n\/.*\/global.json')).respond({});
            $httpBackend.whenGET(new RegExp('i18n\/.*\/main.json')).respond({});
            $httpBackend.whenGET('scripts/components/navbar/navbar.html').respond({});
            $httpBackend.whenGET('scripts/views/main/main.html').respond({});
		});
	});

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

	it('Should not match when different password', function () {
		
		$scope.registerAccount.password = 'myPassword';
		$scope.confirmPassword = 'otherPassword';
		
		$scope.$apply(function () {
			$scope.register();
		});
		
		expect($scope.alert.doNotMatch).toEqual('ERROR');
		expect($scope.registerAccount.type).toBeUndefined();
		expect($scope.registerAccount.langKey).toBeUndefined();
		expect(AuthService.createAccount).not.toHaveBeenCalled();
	});

	it('Should register when correct password', function () {
		$scope.registerAccount.password = 'myPassword';
		$scope.confirmPassword = 'myPassword';
		
		$scope.$apply(function () {
			$scope.register();
		});
		
		expect($scope.alert.success).toEqual('OK');
		expect($scope.registerAccount.type).toEqual('individual');
		expect($scope.registerAccount.langKey).toEqual('fr');
	});

	it('Should get error when account creation failed', function () {
		AuthService.createAccount.and.returnValue($q.reject({status: 400, data: 'fail'}));
		$scope.registerAccount.password = 'myPassword';
		$scope.confirmPassword = 'myPassword';
		
		$scope.$apply(function () {
			$scope.register();
		});
		
		expect($scope.alert.error).toEqual('ERROR');
	});

	it('Should get error when account creation failed because of email already in use', function () {
		AuthService.createAccount.and.returnValue($q.reject({status: 400, data: 'e-mail address already in use'}));
		$scope.registerAccount.password = 'myPassword';
		$scope.confirmPassword = 'myPassword';
		
		$scope.$apply(function () {
			$scope.register();
		});
		
		expect($scope.alert.errorEmailExists).toEqual('ERROR');
	});
});