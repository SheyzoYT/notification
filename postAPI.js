const firebaseConfig = {
    apiKey: "AIzaSyC0YJTUHP2CUsgU8yTnSp4RvR2N4CvVNVc",
    authDomain: "test-5d9fe.firebaseapp.com",
    databaseURL: "https://test-5d9fe-default-rtdb.firebaseio.com",
    projectId: "test-5d9fe",
    storageBucket: "test-5d9fe.appspot.com",
    messagingSenderId: "289212452495",
    appId: "1:289212452495:web:9a8d74aa4e1163aeb96afa",
    measurementId: "G-Y09NW007X9"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
    e.preventDefault();

    const chatTxt = document.getElementById("chat-txt");
    const message = chatTxt.value;

    db.ref("post/" + Date.now()).set({
        usr: "Oxy2.0",
        date: Date.now(),
        msg: message,
    });
}
const fetchChat = db.ref("post/");
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();

    const msg = `
    <div class="boxnew">
    <div class="boxnew-header">
        <div class="content">
            <p class="text-mono">Publié par <span>${messages.usr}</span></p>
        </div>
    </div>
    <article class="markdown-ebody">
        <h1>Patch-update [1.0.0] 25/09/2022</h1>
        <span class="markSepar"></span>
        <p>
        ${messages.msg}
        </p>
    </article>
</div>`;
    document.getElementById("messages").innerHTML += msg;
});