'use strict';

angular.module('sejourFrontApp')
    .factory('AuthService', function Auth($rootScope, $q, $translate) {
        return {
            login: function (credentials) {
                
                var deferred = $q.defer();

                var account = {
                    id: '567169632c091125beab16af',
                    email: credentials.username,
                    type: 'individual',
                    identity: {lastName: 'Kim', firstName: 'Soon-Jeen'},
                    langKey: 'fr',
                    roles: ['ROLE_USAGER']
                };

                $rootScope.account = account;
                $translate.use(account.langKey);
                $translate.refresh();

                deferred.resolve(account);

                return deferred.promise;
            },

            logout: function () {
            	$rootScope.account = undefined;
            }
        };
    });
