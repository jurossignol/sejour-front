'use strict';

/**
*  Module
*
* Description
*/
angular.module('sejourFrontApp', ['ui.router', 
									'LocalStorageModule',
									'ngCookies',
									'pascalprecht.translate',
									'tmh.dynamicLocale'])

	.run(function($rootScope, $state, $translate, $window, Language, ENV, VERSION){
		$rootScope.ENV = ENV;
		$rootScope.VERSION = VERSION;

		$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            
            // if (Principal.isIdentityResolved()) {
            //     Auth.authorize();
            // }
            
            // Update the language
            Language.getCurrent().then(function (language) {
                $translate.use(language);
            });
            
        });

        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
            var titleKey = 'global.title' ;

            $rootScope.previousStateName = fromState.name;
            $rootScope.previousStateParams = fromParams;

            // Set the page title key to the one configured in state or use default one
            if (toState.data.pageTitle) {
                titleKey = toState.data.pageTitle;
            }
            
            $translate(titleKey).then(function (title) {
                // Change window title with translated one
                $window.document.title = title;
            });
            
        });
	})

	.config(function ($httpProvider, $urlRouterProvider, $stateProvider, $translateProvider, tmhDynamicLocaleProvider) {

        //enable CSRF
        $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

        //Cache everything except rest api requests
        // httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('site', {
            'abstract': true,
            data: {
                pageTitle: 'global.page.title'
            },
            views: {
                'navbar@': {
                    templateUrl: 'scripts/components/navbar/navbar.html',
                    controller: 'NavbarController'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                }]
            }
        });

        // $httpProvider.interceptors.push('errorHandlerInterceptor');
        // $httpProvider.interceptors.push('authExpiredInterceptor');
        // $httpProvider.interceptors.push('notificationInterceptor');
        
        // Initialize angular-translate
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });

        $translateProvider.preferredLanguage('fr');
        $translateProvider.useCookieStorage();
        $translateProvider.useSanitizeValueStrategy('escaped');
        // $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.useCookieStorage();
        tmhDynamicLocaleProvider.storageKey('NG_TRANSLATE_LANG_KEY');

    });