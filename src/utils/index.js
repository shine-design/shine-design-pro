window.mUtilElementDataStore = {};
window.mUtilElementDataStoreID = 0;
window.mUtilDelegatedEventHandlers = {};


const breakpoints = {
	sm: 544, // Small screen / phone
	md: 768, // Medium screen / tablet
	lg: 1024, // Large screen / desktop
	xl: 1200 // Extra large screen / wide desktop
};


const Util = {
	get: query => {
		let el;
		if (query === document) {
			return document;
		}

		if (!!(query && query.nodeType === 1)) {
			return query;
		}

		if (el = document.getElementById(query)) {
			return el;
		} else if (el = document.getElementsByTagName(query)) {
			return el[0];
		} else if (el = document.getElementsByClassName(query)) {
			return el[0];
		} else {
			return null;
		}
	},
	deepExtend: out => {
		out = out || {};

		for (let i = 1; i < arguments.length; i++) {
			let obj = arguments[i];

			if (!obj) continue;

			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (typeof obj[key] === 'object')
						out[key] = Util.deepExtend(out[key], obj[key]);
					else
						out[key] = obj[key];
				}
			}
		}

		return out;
	},
	getViewPort: () => {
		let e = window,
			a = 'inner';
		if (!('innerWidth' in window)) {
			a = 'client';
			e = document.documentElement || document.body;
		}

		return {
			width: e[a + 'Width'],
			height: e[a + 'Height']
		};
	},
	getBreakpoint: mode => {
		return breakpoints[mode];
	},
	trim: string => {
		return string.trim();
	},
	isInResponsiveRange: mode => {
		const breakpoint = Util.getViewPort().width;

		if (mode === 'general') {
			return true;
		} else if (mode === 'desktop' && breakpoint >= (Util.getBreakpoint('lg') + 1)) {
			return true;
		} else if (mode === 'tablet' && (breakpoint >= (Util.getBreakpoint('md') + 1) && breakpoint < Util.getBreakpoint('lg'))) {
			return true;
		} else if (mode === 'mobile' && breakpoint <= Util.getBreakpoint('md')) {
			return true;
		} else if (mode === 'desktop-and-tablet' && breakpoint >= (Util.getBreakpoint('md') + 1)) {
			return true;
		} else if (mode === 'tablet-and-mobile' && breakpoint <= Util.getBreakpoint('lg')) {
			return true;
		} else if (mode === 'minimal-desktop-and-below' && breakpoint <= Util.getBreakpoint('xl')) {
			return true;
		}

		return false;
	},
	hasClass: (el, className) => {
		if (!el) {
			return;
		}
		return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
	},
	addClass: (el, className) => {
		if (!el || typeof className === 'undefined') {
			return;
		}

		const classNames = className.split(' ');

		if (el.classList) {
			for (let i = 0; i < classNames.length; i++) {
				if (classNames[i] && classNames[i].length > 0) {
					el.classList.add(Util.trim(classNames[i]));
				}
			}
		} else if (!Util.hasClass(el, className)) {
			for (let i = 0; i < classNames.length; i++) {
				el.className += ' ' + Util.trim(classNames[i]);
			}
		}
	},

	removeClass: (el, className) => {
		if (!el) {
			return;
		}

		const classNames = className.split(' ');

		if (el.classList) {
			for (let i = 0; i < classNames.length; i++) {
				el.classList.remove(Util.trim(classNames[i]));
			}
		} else if (Util.hasClass(el, className)) {
			for (let i = 0; i < classNames.length; i++) {
				el.className = el.className.replace(new RegExp('\\b' + Util.trim(classNames[i]) + '\\b', 'g'), '');
			}
		}
	},
	data: function (element) {
		element = Util.get(element);

		return {
			set: function (name, data) {
				if (element.customDataTag === undefined) {
					mUtilElementDataStoreID++;
					element.customDataTag = mUtilElementDataStoreID;
				}

				if (mUtilElementDataStore[element.customDataTag] === undefined) {
					mUtilElementDataStore[element.customDataTag] = {};
				}

				mUtilElementDataStore[element.customDataTag][name] = data;
			},

			get: function (name) {
				return Util.has(name) ? mUtilElementDataStore[element.customDataTag][name] : null;
			},

			has: function (name) {
				return (mUtilElementDataStore[element.customDataTag] && mUtilElementDataStore[element.customDataTag][name]) ? true : false;
			},

			remove: function (name) {
				if (Util.has(name)) {
					delete mUtilElementDataStore[element.customDataTag][name];
				}
			}
		};
	},
	attr: (el, name, value) => {
		// el = Util.get(el);

		if (el === undefined) {
			return;
		}

		if (value !== undefined) {
			el.setAttribute(name, value);
		} else {
			return el.getAttribute(name);
		}
	}
};

export default Util;
