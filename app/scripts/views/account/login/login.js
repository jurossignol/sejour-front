'use strict';

angular.module('sejourFrontApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                parent: 'account',
                url: '/login',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/views/account/login/login.html',
                        controller: 'LoginController'
                    }
                }
            });
    });
