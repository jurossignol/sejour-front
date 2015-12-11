'use strict';

describe('Controller : LanguageController', function () {

	var $scope, $httpBackend;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, $q, $injector, $rootScope, $translate, Language, tmhDynamicLocale) {

			$scope = $rootScope.$new();
			
			var deferred = $q.defer();
	        deferred.resolve(['en', 'fr']);
			spyOn(Language, 'getAll').and.returnValue(deferred.promise);

			$translate.use('fr');
			tmhDynamicLocale.set('fr');

		    $controller('LanguageController', {
		    	$scope: $scope,
		    	$translate: $translate, 
		    	Language: Language, 
		    	tmhDynamicLocale: tmhDynamicLocale
		    });

			$httpBackend = $injector.get('$httpBackend');
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

	it('should be french language by default', function () {
		$scope.$apply();

	    expect($scope.currentLanguage).toEqual('fr');
	    expect($scope.languages.length).toEqual(2);
	    expect($scope.languages).toContain('en');
	    expect($scope.languages).toContain('fr');
	});

	it('should be english language when change language to english', function () {
		$scope.changeLanguage('en');

	    expect($scope.currentLanguage).toEqual('en');
	});
});

describe('Filter : findLanguageFromKey', function () {

	var $filter;

	beforeEach(function () {
		// load the controller's module
		module('sejourFrontApp');

		inject(function ($injector) {
			$filter = $injector.get('$filter');
		});
	});

	it('should find language from key', function() {
		expect($filter('findLanguageFromKey')('fr')).toEqual('Français');
		expect($filter('findLanguageFromKey')('en')).toEqual('English');
	});
});