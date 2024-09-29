if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch((err) => {
                console.log("Service Worker registration failed:", err);
            });
    });
} else {
    console.log("Service Workers are not supported in this browser.");
}
function initPushNotification() {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            subscribeUser();
        }
    });
}
async function subscribeUser() {
    const registration = await navigator.serviceWorker.register("/service-worker.js");
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BE4LLxozZ2s94SOfmtLy5zCBd9H3Ll1TaBNlNY5d8OjnErQQ7PNBPj2BsTLSOoHCDigVBXMJpEU96iTz33UyZ_E"),
    });
    console.log("User is subscribed:", subscription);
    await fetch("api/server", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("Subscription sent to server.");
}
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
passHash = "1231819095";
{
    if (localStorage.getItem("login") == passHash) {
        mainDiv.style.display = "block";
        loginDiv.style.display = "none";
    } else {
        document.getElementById("login").focus();
    }
}
function Login() {
    var passwordInput = document.getElementById("login").value;
    var password = "";
    for (var i = 0; i < passwordInput.length; i++) {
        password = Math.abs(~~((password << 5) - password + passwordInput.charCodeAt(i)));
    }
    localStorage.setItem("login", password);
    if (localStorage.getItem("login") == passHash) {
        mainDiv.style.display = "block";
        loginDiv.style.display = "none";
        initPushNotification();
    } else {
        document.getElementById("login").focus();
        document.getElementById("alert").style.display = "block";
    }
}
function PressEnterToLogin() {
    if (event.which == 13 || event.keyCode == 13) {
        Login();
    }
}
function Logout() {
    localStorage.setItem("login", "");
    window.location.href = "index.html";
}
window.onscroll = function () {
    if (window.pageYOffset < 10) {
        document.getElementById("logout").style.top = "15px";
        if (document.getElementById("android")) {
            document.getElementById("android").style.top = "15px";
        }
        if (document.getElementById("notifications")) {
            document.getElementById("notifications").style.top = "15px";
        }
        if (document.getElementById("about")) {
            document.getElementById("about").style.top = "15px";
        }
    } else {
        document.getElementById("logout").style.top = "-50px";
        if (document.getElementById("android")) {
            document.getElementById("android").style.top = "-50px";
        }
        if (document.getElementById("notifications")) {
            document.getElementById("notifications").style.top = "-50px";
        }
        if (document.getElementById("about")) {
            document.getElementById("about").style.top = "-50px";
        }
    }
};
