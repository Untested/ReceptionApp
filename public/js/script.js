"use strict";

// App Class

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App(obj) {
		_classCallCheck(this, App);

		this.title = obj.title;
		this.dom = obj.dom;
		this.state = {
			window: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		};
	}

	_createClass(App, [{
		key: 'selector',
		value: function selector(el) {
			var elem = document.querySelectorAll(el);
			if (elem) if (elem.length <= 1) {
				return elem[0];
			}
			return elem;
		}
	}, {
		key: 'getDevice',
		value: function getDevice() {
			// S = Mobile
			// M = Tablet
			// L = Dekstop
			// X = TV
			if (this.state.window) {
				var width = this.state.window.width;
				var height = this.state.window.height;

				// We Use If-Immediate Over Switch-Immediate as it's Faster
				if (width <= 767) {
					return 'S';
				} else if (width >= 768 && width <= 1024) {
					return 'M';
				} else if (width >= 1025) {
					return 'L';
				} else if (width == 1920 && height == 1080) {
					return 'X';
				}
			}
		}
	}, {
		key: 'uiSize',
		value: function uiSize(el, attr, val) {
			var elem = this.selector(el);
			if (elem && attr && val) {
				var value = typeof val === 'string' ? val : val + 'px';
				elem.style[attr] = value;
			}
		}
	}]);

	return App;
}();

// Reception App


var EM = function EM() {

	var app = new App({
		title: 'New App',
		dom: {
			root: '#root',
			header: '#header',
			footer: '#footer'
		}
	});

	var log = function log(txt) {
		if (txt) console.log(txt);
	};

	var database = function database() {

		// Firebase Database Config
		var config = {
			apiKey: "AIzaSyDplvKWmHsKvhKnLRx3sMM9c16WE28qbHQ",
			authDomain: "reception-app-5ba21.firebaseapp.com",
			databaseURL: "https://reception-app-5ba21.firebaseio.com",
			projectId: "reception-app-5ba21",
			storageBucket: "reception-app-5ba21.appspot.com",
			messagingSenderId: "1093503819278"

			// Initialise Firebase
			// To Make Sure Only One Istance is Running
		};if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}

		var database = firebase.database();

		// Table
		var table = {
			announcement: database.ref('announcement')

			// Get Data from Firebase Database, Table > Announcement
		};var getData = function getData() {
			table.announcement.once('value', function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					var childKey = childSnapshot.key;
					var childData = childSnapshot.val();
					return childSnapshot;
				});
			});
		};

		return {
			getData: getData
		};
	};

	var update = function update() {
		// Update App State
		app.state.window = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		// Update Root Width/Height on Window Resize
		// Make Large Device to Fit Full Screen
		if (app.getDevice() === 'L') {
			// app.uiSize(app.dom.root, 'width', app.state.window.width);
			// app.uiSize(app.dom.root, 'height', app.state.window.height);
			app.selector(app.dom.root).style.width = app.state.window.width + 'px';
			app.selector(app.dom.root).style.height = app.state.window.height + 'px';
		} else {
			app.selector(app.dom.root).removeAttribute('style');
		}
		// Log State
		// log(app.state.window)
		// log(app.state.window.width)
		// log(app.getDevice())
	};

	var init = function init() {
		window.onload = function () {

			console.log('Hello');

			// Initialise App
			app;

			// Initialise Database
			database();

			// app.selector(app.dom.root).innerHTML = database().getData();

			// Update App UI and State
			update();
		};

		window.onresize = function () {

			// Update App UI and State
			update();
			// log(JSON.stringify(app.state.window))
		};
	};

	return {
		init: init
	};
};

EM().init();