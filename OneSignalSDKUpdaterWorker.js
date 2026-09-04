// =========================================================================
// ONESIGNAL & FIREBASE UNIFIED SERVICE WORKER - CALISTHENICS TREE
// =========================================================================

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// 1. OneSignal Web SDK Service Worker (priorità push background)
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// 2. Firebase App & Messaging SDK compat
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyA8DxxaRgjpdv9eldZnDiAipceVv6IJ5Ds",
    authDomain: "calisthenics-tree-b9a06.firebaseapp.com",
    projectId: "calisthenics-tree-b9a06",
    storageBucket: "calisthenics-tree-b9a06.firebasestorage.app",
    messagingSenderId: "385003641400",
    appId: "1:385003641400:web:7974dd3adc322170c264cd",
    measurementId: "G-ZF4P6HX9HN"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[Unified SW] Firebase background message:', payload);
});
 
