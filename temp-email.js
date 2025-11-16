// --- TEMPMail using 1secmail API ---
// Generate a random email + fetch inbox

const apiBase = "https://www.1secmail.com/api/v1/";

function randomName(length = 10) {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let name = "";
    for (let i = 0; i < length; i++) {
        name += chars[Math.floor(Math.random() * chars.length)];
    }
    return name;
}

// Generate Email
async function generateEmail() {
    const user = randomName();
    const domain = "1secmail.com";
    const email = `${user}@${domain}`;

    document.getElementById("emailDisplay").innerText = email;

    // Save user + domain in localStorage to use with inbox
    localStorage.setItem("tempUser", user);
    localStorage.setItem("tempDomain", domain);

    alert("📩 Email généré ! ce système est encore en développement,des erreurs peuvent survenir !");
}

// Get Inbox
async function getInbox() {
    const user = localStorage.getItem("tempUser");
    const domain = localStorage.getItem("tempDomain");

    if (!user || !domain) {
        alert("😅 Tu dois d'abord générer un email !");
        return;
    }

    const url = `${apiBase}?action=getMessages&login=${user}&domain=${domain}`;
    const response = await fetch(url);
    const messages = await response.json();

    const inboxDiv = document.getElementById("inboxDisplay");
    inboxDiv.innerHTML = ""; // Clear

    if (messages.length === 0) {
        inboxDiv.innerHTML = "📭 Aucun message pour le moment...";
        return;
    }

    // Display messages
    messages.forEach(async msg => {
        const messageBox = document.createElement("div");
        messageBox.className = "messageBox";

        messageBox.innerHTML = `
            <h3>📧 ${msg.subject}</h3>
            <p><b>From:</b> ${msg.from}</p>
            <p><b>Date:</b> ${msg.date}</p>
            <button onclick="readMessage(${msg.id})">📥 Lire</button>
        `;

        inboxDiv.appendChild(messageBox);
    });
}

// Read Message
async function readMessage(id) {
    const user = localStorage.getItem("tempUser");
    const domain = localStorage.getItem("tempDomain");

    const url = `${apiBase}?action=readMessage&login=${user}&domain=${domain}&id=${id}`;
    const response = await fetch(url);
    const data = await response.json();

    // Show message content in modal / alert
    alert(
        `📩 Sujet : ${data.subject}\n\n` +
        `📤 De : ${data.from}\n\n` +
        `💬 Message :\n${data.textBody || "(Pas de texte visible)"}`
    );
}