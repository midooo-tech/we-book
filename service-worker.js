self.addEventListener("push", (event) => {
    if (!event.data) {
        console.error("No data in push event.");
        return;
    }
    const data = event.data.json();
    console.log("Push received:", data);
    const title = data.title || "WE Book";
    if (!data.url) {
        console.error("No URL in push notification data.");
        return;
    }
    const options = {
        body: data.body || "No body content",
        icon: "/Icon.png",
        badge: "/Icon.png",
        data: {
            url: data.url,
        },
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener("notificationclick", (e) => {
    e.notification.close();
    e.waitUntil(
        clients
            .openWindow(e.notification?.data?.url)
            .then((windowClient) => {
                if (windowClient) {
                    windowClient.focus();
                }
            })
            .catch((err) => {
                console.error("Error opening window:", err);
            })
    );
});
