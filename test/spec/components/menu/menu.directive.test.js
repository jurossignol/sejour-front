'use strict';

describe('Directive : menu', function () {

	var $httpBackend, $compile, $scope;

	beforeEach(function () {

		module('sejourFrontApp');
        module('htmlTemplates');

		inject(function (_$httpBackend_, _$compile_, $rootScope) {
	        $scope = $rootScope.$new();
            $compile = _$compile_;
            
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

    describe('boxMenu', function () {

    	it('Should display box disabled without badge', function () {
            var elm = angular.element('<box-menu class="box-home" boxtitle="main.unknown" boxlogo="user" disabled="true"></box-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.box').hasClass('box-disabled')).toBeTruthy();
            expect(elm.find('span').hasClass('fa-user')).toBeTruthy();
            expect(elm.find('p').text()).toEqual('main.unknown');
            expect(elm.find('div.badge').hasClass('ng-hide')).toBeTruthy();
            expect(elm.find('div.emptybadge').hasClass('ng-hide')).toBeTruthy();
        });

        it('Should display box with badge 0', function () {
            var elm = angular.element('<box-menu class="box-home" boxtitle="main.unknown" boxlogo="user" boxbadge="0"></box-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.box').hasClass('box-disabled')).toBeFalsy();
            expect(elm.find('span').hasClass('fa-user')).toBeTruthy();
            expect(elm.find('p').text()).toEqual('main.unknown');
            expect(elm.find('div.badge').hasClass('ng-hide')).toBeTruthy();
            expect(elm.find('div.emptybadge').hasClass('ng-hide')).toBeFalsy();
        });

        it('Should display box with badge 1', function () {
            var elm = angular.element('<box-menu class="box-home" boxtitle="main.unknown" boxlogo="user" boxbadge="1"></box-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.box').hasClass('box-disabled')).toBeFalsy();
            expect(elm.find('span').hasClass('fa-user')).toBeTruthy();
            expect(elm.find('p').text()).toEqual('main.unknown');
            expect(elm.find('div.badge').hasClass('ng-hide')).toBeFalsy();
            expect(elm.find('div.badge').text()).toEqual('1');
            expect(elm.find('div.emptybadge').hasClass('ng-hide')).toBeTruthy();
        });
    });

    describe('stepsMenu', function () {

        it('Should display steps disabled', function () {
            var elm = angular.element('<steps-menu stepnumber="0"></steps-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.step-number-horizontal').length).toEqual(5);

            expect(elm.find('div.step-number-horizontal')[0].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[0].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[1].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[1].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[2].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[2].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[3].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[3].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[4].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[4].className).not.toContain('step-number-green');
        });

        it('Should display step 1', function () {
            var elm = angular.element('<steps-menu stepnumber="1"></steps-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.step-number-horizontal').length).toEqual(5);

            expect(elm.find('div.step-number-horizontal')[0].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[0].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[1].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[1].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[2].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[2].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[3].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[3].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[4].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[4].className).not.toContain('step-number-green');
        });

        it('Should display step 2', function () {
            var elm = angular.element('<steps-menu stepnumber="2"></steps-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.step-number-horizontal').length).toEqual(5);

            expect(elm.find('div.step-number-horizontal')[0].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[0].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[1].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[1].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[2].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[2].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[3].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[3].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[4].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[4].className).not.toContain('step-number-green');
        });

        it('Should display step 3', function () {
            var elm = angular.element('<steps-menu stepnumber="3"></steps-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.step-number-horizontal').length).toEqual(5);

            expect(elm.find('div.step-number-horizontal')[0].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[0].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[1].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[1].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[2].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[2].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[3].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[3].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[4].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[4].className).not.toContain('step-number-green');
        });

        it('Should display step 4', function () {
            var elm = angular.element('<steps-menu stepnumber="4"></steps-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.step-number-horizontal').length).toEqual(5);

            expect(elm.find('div.step-number-horizontal')[0].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[0].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[1].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[1].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[2].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[2].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[3].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[3].className).not.toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[4].className).toContain('box-disabled');
            expect(elm.find('div.step-number')[4].className).not.toContain('step-number-green');
        });

        it('Should display step 5', function () {
            var elm = angular.element('<steps-menu stepnumber="5"></steps-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.step-number-horizontal').length).toEqual(5);

            expect(elm.find('div.step-number-horizontal')[0].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[0].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[1].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[1].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[2].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[2].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[3].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[3].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[4].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[4].className).not.toContain('step-number-green');
        });

        it('Should display all steps green', function () {
            var elm = angular.element('<steps-menu stepnumber="6"></steps-menu>');
            $compile(elm)($scope);
            $scope.$digest(); // To render html (because of template url)

            expect(elm.find('div.step-number-horizontal').length).toEqual(5);

            expect(elm.find('div.step-number-horizontal')[0].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[0].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[1].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[1].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[2].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[2].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[3].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[3].className).toContain('step-number-green');
            expect(elm.find('div.step-number-horizontal')[4].className).not.toContain('box-disabled');
            expect(elm.find('div.step-number')[4].className).toContain('step-number-green');
        });
    });
});