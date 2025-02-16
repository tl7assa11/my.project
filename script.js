const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('generateQRCodeButton').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value;
    if (name) {
        const qrCodeText = `https://yourwebsite.com/attendance?name=${encodeURIComponent(name)}`;
        
        document.getElementById("qrcode").innerHTML = '';

        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: qrCodeText,
            width: 128,
            height: 128
        });

        saveAttendanceData(name);
    } else {
        alert('Введите имя!');
    }
});

function saveAttendanceData(name) {
    const date = new Date();
    const docRef = db.collection('attendance').doc();

    docRef.set({
        name: name,
        date: date.toISOString(),
    }).then(() => {
        console.log("Данные сохранены");
    }).catch((error) => {
        console.error("Ошибка записи: ", error);
    });
}
