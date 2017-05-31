/* eslint eqeqeq: "off" */
// polyfills for fetch, Promise, and Object.assign

import 'unfetch/polyfill'
import Promise from 'promise-polyfill'

// check for window object before adding anything to it.
if (typeof window !== "undefined") {
	if (!window.Promise) {
		window.Promise = Promise
	}

	// TODO: This should work on IE 9>. I am not sure why it's not working on IE 11
	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	if (!Object.keys) {
		Object.keys = (function() {
			'use strict';
			var hasOwnProperty = Object.prototype.hasOwnProperty,
					hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
					dontEnums = [
						'toString',
						'toLocaleString',
						'valueOf',
						'hasOwnProperty',
						'isPrototypeOf',
						'propertyIsEnumerable',
						'constructor'
					],
					dontEnumsLength = dontEnums.length;

			return function(obj) {
				if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
					throw new TypeError('Object.keys called on non-object');
				}

				var result = [], prop, i;

				for (prop in obj) {
					if (hasOwnProperty.call(obj, prop)) {
						result.push(prop);
					}
				}

				if (hasDontEnumBug) {
					for (i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
						}
					}
				}
				return result;
			};
		}());
	}
}
