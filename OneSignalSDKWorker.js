self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Ascolta messaggi dall'app per rimuovere/chiudere notifiche di messaggi eliminati o chat aperte
self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'dismiss_notification') {
        event.waitUntil(
            self.registration.getNotifications().then(notifications => {
                notifications.forEach(n => {
                    try { n.close(); } catch(e) {}
                });
            })
        );
    }
});

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
