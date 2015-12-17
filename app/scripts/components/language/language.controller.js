'use strict';

angular.module('sejourFrontApp')
    .controller('LanguageController', function ($scope, $translate, LanguageService, tmhDynamicLocale) {
    	$scope.currentLanguage = tmhDynamicLocale.get();
    	
        $scope.changeLanguage = function (languageKey) {
            $translate.use(languageKey);
            tmhDynamicLocale.set(languageKey);
            $scope.currentLanguage = tmhDynamicLocale.get();
        };

        LanguageService.getAll().then(function (languages) {
            $scope.languages = languages;
        });
    })
    .filter('findLanguageFromKeyFilter', function () {
        return function (lang) {
            return {
                'ca': 'Català',
                'da': 'Dansk',
                'de': 'Deutsch',
                'en': 'English',
                'es': 'Español',
                'fr': 'Français',
                'hu': 'Magyar',
                'it': 'Italiano',
                'ja': '日本語',
                'kr': '한국어',
                'nl': 'Nederlands',
                'pl': 'Polski',
                'pt-br': 'Português (Brasil)',
                'ro': 'Română',
                'ru': 'Русский',
                'sv': 'Svenska',
                'tr': 'Türkçe',
                'zh-cn': '中文（简体）',
                'zh-tw': '繁體中文'
            }[lang];
        };
    });
