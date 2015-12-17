'use strict';

describe('Controller : LoginController', function () {

	var $httpBackend, $q, $rootScope, $scope, $state, AuthService,
		event = {preventDefault: function () {return;}};

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, _$httpBackend_, _$q_, _$rootScope_, _$state_, _AuthService_) {
			$q = _$q_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$scope.username = 'myUsername';
			$scope.password = 'myPassword';
			$state = _$state_;
			AuthService = _AuthService_;

			spyOn($state, 'go').and.callFake(function () {});
			spyOn(AuthService, 'login').and.returnValue($q.when({}));

			$controller('LoginController', { $scope: $scope });

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

	it('Should remember me', function () {
		expect($scope.rememberMe).toBeTruthy();
	});

	it('Should redirect to state returned when login success', function () {
		$rootScope.returnToState = { name: 'myState' };

		$scope.$apply(function () {
			$scope.login(event);
		});

		expect(AuthService.login).toHaveBeenCalledWith({username: 'myUsername', password: 'myPassword', rememberMe: true});
		expect($scope.authenticationError).toBeFalsy();
		expect($state.go).toHaveBeenCalledWith('myState');
	});

	it('Should redirect to home state when login success with previous state activate', function () {
		$rootScope.returnToState = null;
		$rootScope.previousStateName = 'activate';

		$scope.$apply(function () {
			$scope.login(event);
		});

		expect(AuthService.login).toHaveBeenCalledWith({username: 'myUsername', password: 'myPassword', rememberMe: true});
		expect($scope.authenticationError).toBeFalsy();
		expect($state.go).toHaveBeenCalledWith('home');
	});

	it('Should redirect to home state when login success with previous state register', function () {
		$rootScope.returnToState = null;
		$rootScope.previousStateName = 'register';

		$scope.$apply(function () {
			$scope.login(event);
		});

		expect(AuthService.login).toHaveBeenCalledWith({username: 'myUsername', password: 'myPassword', rememberMe: true});
		expect($scope.authenticationError).toBeFalsy();
		expect($state.go).toHaveBeenCalledWith('home');
	});

	it('Should redirect to home state when login success without previous state', function () {
		$rootScope.returnToState = null;
		$rootScope.previousStateName = null;

		$scope.$apply(function () {
			$scope.login(event);
		});

		expect(AuthService.login).toHaveBeenCalledWith({username: 'myUsername', password: 'myPassword', rememberMe: true});
		expect($scope.authenticationError).toBeFalsy();
		expect($state.go).toHaveBeenCalledWith('home');
	});

	it('Should redirect to previous state when login success', function () {
		spyOn($state, 'get').and.returnValue('myState');
		$rootScope.returnToState = null;
		$rootScope.previousStateName = 'myState';
		$rootScope.previousStateParams = {};
		
		$scope.$apply(function () {
			$scope.login(event);
		});

		expect(AuthService.login).toHaveBeenCalledWith({username: 'myUsername', password: 'myPassword', rememberMe: true});
		expect($scope.authenticationError).toBeFalsy();
		expect($state.go).toHaveBeenCalledWith('myState', {});
	});

	it('Should get error when login failed', function () {
		AuthService.login.and.returnValue($q.reject('fail'));
		
		$scope.$apply(function () {
			$scope.login(event);
		});

		expect(AuthService.login).toHaveBeenCalledWith({username: 'myUsername', password: 'myPassword', rememberMe: true});
		expect($scope.authenticationError).toBeTruthy();
		expect($state.go).not.toHaveBeenCalled();
	});
});