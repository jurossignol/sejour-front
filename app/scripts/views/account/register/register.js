'use strict';

angular.module('sejourFrontApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('register', {
                parent: 'account',
                url: '/register',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/views/account/register/register.html',
                        controller: 'RegisterController'
                    }
                }
            });
    });
