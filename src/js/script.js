"use strict";

// App Class
class App {
	constructor(obj) {
		this.title = obj.title;
		this.dom = obj.dom;
		this.state = {
			window: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		}
	}

	selector(el) {
		const elem = document.querySelectorAll(el);
		if (elem)
			if (elem.length <= 1) {
				return elem[0];
			}
		return elem;
	}


	getDevice() {
		// S = Mobile
		// M = Tablet
		// L = Dekstop
		// X = TV
		if (this.state.window) {
			const width = this.state.window.width;
			const height = this.state.window.height;

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

	uiSize(el, attr, val) {
		const elem = this.selector(el);
		if (elem && attr && val) {
			const value = typeof val === 'string' ? val : `${val}px`;
			elem.style[attr] = value;
		}
	}
}

// Reception App
const EM = () => {

	const app = new App({
		title: 'New App',
		dom: {
			root: '#root',
			header: '#header',
			footer: '#footer'
		}
	});

	const log = (txt) => {
		if (txt)
			console.log(txt)
	}

	const database = () => {

		// Firebase Database Config
		const config = {
			apiKey: "AIzaSyDplvKWmHsKvhKnLRx3sMM9c16WE28qbHQ",
			authDomain: "reception-app-5ba21.firebaseapp.com",
			databaseURL: "https://reception-app-5ba21.firebaseio.com",
			projectId: "reception-app-5ba21",
			storageBucket: "reception-app-5ba21.appspot.com",
			messagingSenderId: "1093503819278"
		}

		// Initialise Firebase
		// To Make Sure Only One Istance is Running
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}

		const database = firebase.database();

		// Table
		const table = {
			announcement: database.ref('announcement')
		}

		// Get Data from Firebase Database, Table > Announcement
		const getData = () => {
			table.announcement.once('value', function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					var childKey = childSnapshot.key;
					var childData = childSnapshot.val();
					return childSnapshot;
				});
			});
		}

		return {
			getData: getData
		}
	}

	const update = () => {
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
			app.selector(app.dom.root).style.width = `${app.state.window.width}px`;
			app.selector(app.dom.root).style.height = `${app.state.window.height}px`;
		} else {
			app.selector(app.dom.root).removeAttribute('style');
		}
		// Log State
		// log(app.state.window)
		// log(app.state.window.width)
		// log(app.getDevice())
	};

	const init = () => {
		window.onload = () => {

			console.log('Hello')

			// Initialise App
			app;

			// Initialise Database
			database();

			// app.selector(app.dom.root).innerHTML = database().getData();

			// Update App UI and State
			update();
		}
		
		window.onresize = () => {

			// Update App UI and State
			update();
			// log(JSON.stringify(app.state.window))
		}
	};

	return {
		init: init
	}
};

EM().init();