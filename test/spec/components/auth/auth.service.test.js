'use strict';

describe('Service : AuthService', function () {

	var $rootScope, $translate, AuthService;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function (_$rootScope_, _$translate_, _AuthService_) {
			$rootScope = _$rootScope_;
			$translate = _$translate_;
			AuthService = _AuthService_;

			spyOn($translate, 'use').and.callThrough();
		});
	});

	it('Should login', function () {
		AuthService.login({ username: 'kim.soon.jeen@gmail.com'}).then(function () {
			expect($rootScope.account.email).toBeEqual('kim.soon.jeen@gmail.com');
			expect($translate.use).toHaveBeenCalledWith('fr');
		});
	});

	it('Should logout', function () {
		$rootScope.account = {};

		AuthService.logout();

		expect($rootScope.account).toBeUndefined();
	});
});