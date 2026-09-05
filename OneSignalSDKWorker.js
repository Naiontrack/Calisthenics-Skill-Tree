self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Ascolta messaggi dall'app per rimuovere/chiudere notifiche di messaggi eliminati
self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'dismiss_notification') {
        const id = event.data.id;
        event.waitUntil(
            self.registration.getNotifications().then(notifications => {
                notifications.forEach(n => {
                    const d = n.data || {};
                    if (!id || n.tag === id || d.msgId === id || d.id === id || (d.type === 'chat' && d.id === id) || (id === 'general' && d.type === 'general')) {
                        n.close();
                    }
                });
            })
        );
    }
});

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
