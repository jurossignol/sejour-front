'use strict';

describe('Directive : passwordStrengthBar', function () {

	var $scope, elm, $httpBackend;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($injector, $rootScope, $compile) {
	        $scope = $rootScope.$new();
	        elm = angular.element('<password-strength-bar password-to-check="password"></password-strength-bar>');
	        $compile(elm)($scope);

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

	it("Should display the password strength bar", function () {
		expect(elm.hasClass('ng-hide')).toBeFalsy();
        expect(elm.find('ul').length).toEqual(1);
        expect(elm.find('li').length).toEqual(5);
    });

	it("Should hide the password strength bar", function () {
		$scope.$apply(function () {
            $scope.password = "";
        });
		expect(elm.hasClass('ng-hide')).toBeTruthy();
    });

    it("Should change the first point of the strength bar", function () {
        $scope.$apply(function () {
            $scope.password = "smallest"; // that should trigger the first point
        });

        var firstpointStyle = elm.find('ul').children('li')[0].getAttribute('style');
        expect(firstpointStyle).toContain('background-color: rgb(255, 0, 0)');

        var secondpointStyle = elm.find('ul').children('li')[1].getAttribute('style');
        expect(secondpointStyle).toContain('background-color: rgb(221, 221, 221)');
    });

    it("Should change the first 2 points of the strength bar", function () {
        $scope.$apply(function () {
            $scope.password = "morethan5chars"; // that should trigger the 2 first points
        });

        var firstpointStyle = elm.find('ul').children('li')[0].getAttribute('style');
        expect(firstpointStyle).toContain('background-color: rgb(255, 153, 0)');

        var secondpointStyle = elm.find('ul').children('li')[1].getAttribute('style');
        expect(secondpointStyle).toContain('background-color: rgb(255, 153, 0)');

        var thirdpointStyle = elm.find('ul').children('li')[2].getAttribute('style');
        expect(thirdpointStyle).toContain('background-color: rgb(221, 221, 221)');
    });

    it("Should change the first 4 points of the strength bar", function () {
        $scope.$apply(function () {
            $scope.password = "mo5ch$=!"; // that should trigger the 3 first points
        });

        var firstpointStyle = elm.find('ul').children('li')[0].getAttribute('style');
        expect(firstpointStyle).toContain('background-color: rgb(153, 255, 0)');

        var secondpointStyle = elm.find('ul').children('li')[1].getAttribute('style');
        expect(secondpointStyle).toContain('background-color: rgb(153, 255, 0)');

        var thirdpointStyle = elm.find('ul').children('li')[2].getAttribute('style');
        expect(thirdpointStyle).toContain('background-color: rgb(153, 255, 0)');

        var fourthpointStyle = elm.find('ul').children('li')[3].getAttribute('style');
        expect(fourthpointStyle).toContain('background-color: rgb(153, 255, 0)');

        var fifthpointStyle = elm.find('ul').children('li')[4].getAttribute('style');
        expect(fifthpointStyle).toContain('background-color: rgb(221, 221, 221)');
    });

    it("Should change the first 5 points of the strength bar", function () {
        $scope.$apply(function () {
            $scope.password = "mo5ch$=!Long"; // that should trigger the 3 first points
        });

        var firstpointStyle = elm.find('ul').children('li')[0].getAttribute('style');
        expect(firstpointStyle).toContain('background-color: rgb(0, 255, 0)');

        var secondpointStyle = elm.find('ul').children('li')[1].getAttribute('style');
        expect(secondpointStyle).toContain('background-color: rgb(0, 255, 0)');

        var thirdpointStyle = elm.find('ul').children('li')[2].getAttribute('style');
        expect(thirdpointStyle).toContain('background-color: rgb(0, 255, 0)');

        var fourthpointStyle = elm.find('ul').children('li')[3].getAttribute('style');
        expect(fourthpointStyle).toContain('background-color: rgb(0, 255, 0)');

        var fifthpointStyle = elm.find('ul').children('li')[4].getAttribute('style');
        expect(fifthpointStyle).toContain('background-color: rgb(0, 255, 0)');
    });
});