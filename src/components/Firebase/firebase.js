import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config = {
    apiKey: "AIzaSyDFp-_39hwtqw5riIpzbXrcBEaF1987nGg",
    authDomain: "learning-react-e0225.firebaseapp.com",
    databaseURL: "https://learning-react-e0225.firebaseio.com",
    projectId: "learning-react-e0225",
    storageBucket: "learning-react-e0225.appspot.com",
    messagingSenderId: "703717338104",
  };
  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.database();
    }
      // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

      // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

    // *** Computer API ***

    computer = uid => this.db.ref(`computers/${uid}`);

    computers = () => this.db.ref('computers');
  }
  
  export default Firebase;