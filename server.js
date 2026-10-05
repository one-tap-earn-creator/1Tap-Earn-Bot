const firebaseConfig = {
  apiKey: "AIzaSyC5BFNF137Rx417aa28mGga4m47QvtOo9Y",
  authDomain: "://firebaseapp.com",
  projectId: "tap-earn-3e3e6",
  storageBucket: "tap-earn-3e3e6.firebasestorage.app",
  messagingSenderId: "737917962754",
  appId: "1:737917962754:web:853f20037a6d9b0483351b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const tg = window.Telegram.WebApp;
tg.expand();
const userId = tg.initDataUnsafe?.user?.id || "guest_user";
let taps = 0, totalAds = 0, energy = 1000, maxEnergy = 1000, streak = 0;

db.collection("users").doc(userId.toString()).get().then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        totalAds = data.adsWatched || 0;
        streak = data.streakDays || 0;
        updateUI();
    }
});
const AdController = window.Adsgram.init({ blockId: "3747" });
function switchPage(pageName) {
    if (pageName === 'home') {
        document.getElementById('homePage').classList.add('active'); document.getElementById('tasksPage').classList.remove('active');
    } else {
        document.getElementById('homePage').classList.remove('active'); document.getElementById('tasksPage').classList.add('active');
    }
}
function handleTap() {
    if (totalAds >= 30) { alert("Daily limit reached!"); return; }
    if (energy > 0 && taps < 50) { taps++; energy -= 10; updateUI(); if (taps === 50) { triggerAd(); } }
}
function triggerAd() {
    AdController.show().then(() => {
        totalAds++; taps = 0;
        db.collection("users").doc(userId.toString()).set({ adsWatched: totalAds, streakDays: streak }, { merge: true });
        updateUI();
    });
}
function openSocial(type) {
    let url = type === 'youtube' ? "https://youtube.com" : (type === 'instagram' ? "https://instagram.com" : "https://t.me");
    tg.openLink(url);
}
setInterval(() => { if (energy < maxEnergy) { energy = Math.min(maxEnergy, energy + 5); updateUI(); } }, 1000);
function updateUI() {
    document.getElementById('taps').innerText = taps + " / 50";
    document.getElementById('adCount').innerText = totalAds + " / 30";
}
