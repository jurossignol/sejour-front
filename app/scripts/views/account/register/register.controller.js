'use strict';

angular.module('sejourFrontApp')
    .controller('RegisterController', function ($rootScope, $scope, $translate, $timeout, AuthService) {
        $scope.alert = {};
        $scope.registerAccount = {};
        $timeout(function (){angular.element('[ng-model="registerAccount.email"]').focus();});

        $scope.register = function () {
            $scope.alert = {};
            if ($scope.registerAccount.password !== $scope.confirmPassword) {
                $scope.alert.doNotMatch = 'ERROR';
            } else {
                $scope.registerAccount.type = $rootScope.userType;
                $scope.registerAccount.langKey = $translate.use();
                
                AuthService.createAccount($scope.registerAccount).then(function () {
                    $scope.alert.success = 'OK';
                }).catch(function (response) {
                    $scope.alert.success = null;
                    if (response.status === 400 && response.data === 'e-mail address already in use') {
                        $scope.alert.errorEmailExists = 'ERROR';
                    } else {
                        $scope.alert.error = 'ERROR';
                    }
                });
            }
        };
    });
