import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { routes } from './app.routes';
import { getAnalytics } from "firebase/analytics";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import { initializeApp } from 'firebase/app'; // Original (causerait l'erreur)
import firebase from 'firebase/compat/app';
import {AuthInterceptor} from "./Models/AuthInterceptor";
import {Firestore, FirestoreModule} from "@angular/fire/firestore";
import {FirebaseApp, FirebaseAppModule, FirebaseApps} from "@angular/fire/app";

const firebaseConfig = {
  apiKey: "AIzaSyCdJBlmnjTeC_KqIVqgyr4dA2t0mcv3TYo",
  authDomain: "emishop-8df18.firebaseapp.com",
  projectId: "emishop-8df18",
  storageBucket: "emishop-8df18.appspot.com",
  messagingSenderId: "1021896970735",
  appId: "1:1021896970735:web:04aadabb3ba0dcfe3ce61a",
  measurementId: "G-VLWMB1SS77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    } ,
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    importProvidersFrom(AngularFireAuth),
    importProvidersFrom(AngularFireAuthModule),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), // Correct way to import HttpClientModule
    importProvidersFrom(FirestoreModule , Firestore , FirebaseAppModule , FirebaseApps)
  ]
};
