/*
Config looks like this. It's found in Firebase > Project Overview > (Select app) > General > (scroll down)
{
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
*/
import firebaseConfig from './firebase.config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
