import firebase from 'firebase/app';
import '@firebase/firestore';

const app = firebase.initializeApp  ({
  apiKey: "AIzaSyD7dckGyQvBJmamU7W0KxoKCznvD_v7Cpc",
  authDomain: "fraser2-xpalabras.firebaseapp.com",
  projectId: "fraser2-xpalabras",
  storageBucket: "fraser2-xpalabras.appspot.com",
  messagingSenderId: "596190117612",
  appId: "1:596190117612:web:31d87c42e65e8d2fe6efc9",
  measurementId: "G-BGFPTR9TVG"
});
  
export function getFirebase(){
    return app;
}

export function getFirestore(){
  return firebase.firestore(app);
}