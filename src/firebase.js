import * as firebase from 'firebase';
const config = {
	apiKey: 'AIzaSyBQD_VjIAr4kmpud-JINzvZCn-ES-_4LRE',
	authDomain: 'fireb-bac56.firebaseapp.com',
	databaseURL: 'https://fireb-bac56.firebaseio.com',
	projectId: 'fireb-bac56',
	storageBucket: 'fireb-bac56.appspot.com',
	messagingSenderId: '434552211946'
};

firebase.initializeApp(config);
const firebaseDb = firebase.database();
const googleAuth = new firebase.auth.GoogleAuthProvider();
// for (let i = 1; i < 21; i++) {
// 	firebaseDb.ref('pictures').push({
// 		id: i,
// 		title: 'Picture ' + i,
// 		url: 'http://scallywag.org.uk/images1/' + i + '.jpg'
// 	});
// }

export { firebase, firebaseDb, googleAuth };
