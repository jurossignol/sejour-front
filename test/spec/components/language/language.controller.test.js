'use strict';

describe('Controller : LanguageController', function () {

	var $scope, $httpBackend;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, _$httpBackend_, $q, $rootScope, $translate, LanguageService, tmhDynamicLocale) {

			$scope = $rootScope.$new();
			
			var deferred = $q.defer();
	        deferred.resolve(['en', 'fr']);
			spyOn(LanguageService, 'getAll').and.returnValue(deferred.promise);

			$translate.use('fr');
			tmhDynamicLocale.set('fr');

		    $controller('LanguageController', { $scope: $scope });

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

	it('Should be french language by default', function () {
		$scope.$apply();

	    expect($scope.currentLanguage).toEqual('fr');
	    expect($scope.languages.length).toEqual(2);
	    expect($scope.languages).toContain('en');
	    expect($scope.languages).toContain('fr');
	});

	it('Should be english language when change language to english', function () {
		$scope.changeLanguage('en');

	    expect($scope.currentLanguage).toEqual('en');
	});
});

describe('Filter : findLanguageFromKeyFilter', function () {

	var findLanguageFromKeyFilter;

	beforeEach(function () {
		// load the controller's module
		module('sejourFrontApp');

		inject(function ($filter) {
			findLanguageFromKeyFilter = $filter('findLanguageFromKeyFilter');
		});
	});

	it('Should get language label from key', function() {
		expect(findLanguageFromKeyFilter('fr')).toEqual('Français');
		expect(findLanguageFromKeyFilter('en')).toEqual('English');
	});
});