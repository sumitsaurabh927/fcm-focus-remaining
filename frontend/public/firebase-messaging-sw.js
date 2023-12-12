importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

//from firebase console
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
//when app is in bg
messaging.onBackgroundMessage((payload) => {
    console.log(
        "notif incoming",
        payload
    );
    //payload needs to be parsed as json otherwise it becomes a string
    const notificationTitle = JSON.parse(JSON.parse(payload.notification)).title
    // payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
