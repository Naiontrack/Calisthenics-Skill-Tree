self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Ascolta messaggi dall'app per rimuovere/chiudere notifiche di messaggi eliminati o chat aperte
self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'dismiss_notification') {
        const id = event.data.id;
        event.waitUntil(
            self.registration.getNotifications().then(notifications => {
                notifications.forEach(n => {
                    const d = n.data || {};
                    const custom = (d.custom && d.custom.a) ? d.custom.a : (d.custom || {});
                    const convId = d.id || custom.id || d.convId || custom.convId;
                    const msgId = d.msgId || custom.msgId;
                    const tag = n.tag || '';
                    if (!id || !convId || tag === id || tag.includes(id) || convId === id || msgId === id || (id === 'general' && (d.type === 'general' || tag.includes('general')))) {
                        n.close();
                    }
                });
            })
        );
    }
});

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
