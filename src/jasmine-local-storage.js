"use strict";

(function (global) {

	if (!global.jasmine) {
		throw new Error("jasmine must be loaded before jasmine-local-storage");
	}

	if (!global.localStorage) {
		// throw new Error("localStorage must be supported for jasmine-local-storage");
		global.localStorage = {
			setItem: function () {},
			getItem: function () {},
			removeItem: function () {},
			clear: function () {},
			key: function () {}
		};
	}

	var __realLocalStorageSetItem = global.localStorage.setItem;
	var __realLocalStorageGetItem = global.localStorage.getItem;
	var __realLocalStorageRemoveItem = global.localStorage.removeItem;
	var __realLocalStorageClear = global.localStorage.clear;
	var __realLocalStorageKey = global.localStorage.key;

	global.mockLocalStorage = function () {
		var items = {};
		spyOn(global.localStorage, "setItem").and.callFake(function (key, item) {
			items[key] = item.toString();
		});
		spyOn(global.localStorage, "getItem").and.callFake(function (key) {
			return (items.hasOwnProperty(key) ? items[key] : null);
		});
		spyOn(global.localStorage, "removeItem").and.callFake(function (key) {
			delete items[key];
		});
		spyOn(global.localStorage, "clear").and.callFake(function () {
			items = {};
		});
		spyOn(global.localStorage, "key").and.callFake(function (key) {
			return Object.keys(items)[key];
		});
	};

	global.unmockLocalStorage = function () {
		global.localStorage.setItem = __realLocalStorageSetItem;
		global.localStorage.getItem = __realLocalStorageGetItem;
		global.localStorage.removeItem = __realLocalStorageRemoveItem;
		global.localStorage.clear = __realLocalStorageClear;
		global.localStorage.key = __realLocalStorageKey;
	};


})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
