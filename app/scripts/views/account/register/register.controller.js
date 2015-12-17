'use strict';

angular.module('sejourFrontApp')
    .controller('RegisterController', function ($rootScope, $scope, $translate, $timeout) {
        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;
        $scope.registerAccount = {};
        $timeout(function (){angular.element('[ng-model="registerAccount.email"]').focus();});

        $scope.register = function () {
            if ($scope.registerAccount.password !== $scope.confirmPassword) {
                $scope.doNotMatch = 'ERROR';
            } else {
                $scope.registerAccount.langKey = $translate.use();
                $scope.doNotMatch = null;
                $scope.error = null;
                $scope.errorEmailExists = null;

                $scope.registerAccount.type = $rootScope.userType;
                // Auth.createAccount($scope.registerAccount).then(function () {
                //     $scope.success = 'OK';
                // }).catch(function (response) {
                //     $scope.success = null;
                //     if (response.status === 400 && response.data === 'e-mail address already in use') {
                //         $scope.errorEmailExists = 'ERROR';
                //     } else {
                //         $scope.error = 'ERROR';
                //     }
                // });
            }
        };
    });
