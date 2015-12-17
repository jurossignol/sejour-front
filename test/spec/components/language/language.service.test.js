'use strict';

describe('Service : LanguageService', function () {

	var $translate, LanguageService;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function (_$translate_, _LanguageService_) {
			$translate = _$translate_;
			LanguageService = _LanguageService_;
		});
	});

	it('Should get current language', function () {
		$translate.storage().set('NG_TRANSLATE_LANG_KEY', 'en');
		
		LanguageService.getCurrent().then(function (language) {
			expect(language).toEqual('en');
		});
	});

	it('Should get french language when no current language defined', function () {
		$translate.storage().set('NG_TRANSLATE_LANG_KEY', undefined);
		
		LanguageService.getCurrent().then(function (language) {
			expect(language).toEqual('fr');
		});
	});

	it('Should get all languages', function () {
	    LanguageService.getAll().then(function (languages) {
	    	expect(languages.length).toEqual(2);
	    	expect(languages).toContain('en');
	    	expect(languages).toContain('fr');
	    });
	});
});