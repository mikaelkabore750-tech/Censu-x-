// TikTok Downloader Script using a real API (snapsave / tikwm) // No API key required

async function downloadTikTok() { const url = document.getElementById("tiktokURL").value.trim(); const resultBox = document.getElementById("result");

if (!url) {
    resultBox.innerHTML = "<p style='color:red'>⚠️ Veuillez coller un lien TikTok valide.</p>";
    return;
}

resultBox.innerHTML = "<p>⏳ Téléchargement en cours...</p>";

try {
    // Using TikWM API (free, stable)
    const apiURL = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiURL);
    const data = await response.json();

    if (!data || !data.data) {
        resultBox.innerHTML = "<p style='color:red'>❌ Vidéo introuvable.</p>";
        return;
    }

    const video = data.data.play;
    const cover = data.data.cover;

    resultBox.innerHTML = `
        <img src="${cover}" width="250" style="border-radius:12px; margin-top:15px;" />
        <h3>✔ Vidéo trouvée !</h3>
        <a href="${video}" download class="downloadBtn">📥 Télécharger sans filigrane</a>
    `;
}
catch (err) {
    console.error(err);
    resultBox.innerHTML = "<p style='color:red'>⚠️ Erreur lors de la récupération.</p>";
}

}