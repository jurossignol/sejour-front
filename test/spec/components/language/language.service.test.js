'use strict';

describe('Service : Language', function () {

	var $translate, Language;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($injector) {
			$translate = $injector.get('$translate');
			Language = $injector.get('Language');
		});
	});

	it('should get current language', function () {
		$translate.storage().set('NG_TRANSLATE_LANG_KEY', 'en');
		var promise = Language.getCurrent().then(function (language) {
			expect(language).toEqual('en');
		});
	});

	it('should default current language when undefined', function () {
		$translate.storage().set('NG_TRANSLATE_LANG_KEY', undefined);
		var promise = Language.getCurrent().then(function (language) {
			expect(language).toEqual('fr');
		});
	});

	it('should get all languages', function () {
	    Language.getAll().then(function (languages) {
	    	expect(languages.length).toEqual(2);
	    	expect(languages).toContain('en');
	    	expect(languages).toContain('fr');
	    });
	});
});