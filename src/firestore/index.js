import firebase from 'firebase/app';
import '@firebase/firestore';

const app = firebase.initializeApp  ({
    apiKey: "AIzaSyA0V8TzPyhjtIPUkc9_W3ifB1TWp-Hxrnw",
    authDomain: "fraser2-a5ba2.firebaseapp.com",
    projectId: "fraser2-a5ba2",
    storageBucket: "fraser2-a5ba2.appspot.com",
    messagingSenderId: "1099402339097",
    appId: "1:1099402339097:web:c82a27a831299241631b88"
  });
  
export function getFirebase(){
    return app;
}

export function getFirestore(){
  return firebase.firestore(app);
}