// Search song script for YouTube and Spotify // This is a demo version using YouTube & Spotify public endpoints

async function searchSong() { const query = document.getElementById('songQuery').value.trim(); const resultDiv = document.getElementById('songResult');

if (!query) {
    resultDiv.innerHTML = '<p style="color:red">⚠️ Veuillez entrer le nom d'une chanson.</p>';
    return;
}

resultDiv.innerHTML = '<p>⏳ Recherche en cours...</p>';

try {
    // YouTube search (via ytsearch API)
    const ytAPI = `https://yt-music-api.vercel.app/api/search?q=${encodeURIComponent(query)}`;
    const ytRes = await fetch(ytAPI);
    const ytData = await ytRes.json();

    if (!ytData || !ytData.result || ytData.result.length === 0) {
        resultDiv.innerHTML = '<p style="color:red">❌ Aucun résultat trouvé.</p>';
        return;
    }

    // Take first result
    const song = ytData.result[0];

    resultDiv.innerHTML = `
        <div style="text-align:center; margin-top:15px;">
            <img src="${song.thumbnail}" width="220" style="border-radius:12px;" />
            <h3>${song.title}</h3>
            <p>📺 YouTube: ${song.channel}</p>
            <a href="${song.url}" target="_blank" style="display:inline-block;margin-top:10px;padding:10px 20px;background:#00e0ff;color:#000;border-radius:10px;font-weight:bold;text-decoration:none;">▶ Écouter / Télécharger</a>
        </div>
    `;

    // Optional: Spotify link search
    const spotifyAPI = `https://api.spotify.com/v1/search?q=${encodeURIComponent(BQD-p11hAVqADUMM39t_no2bkaoVl6BhRRXdqlFUYLN3XRuZq-ZrGfC0T2CoN376g4wG6FZ4Pe3qEHx3ruijCQ)}&type=track&limit=1`; 
    // Note: requires token for real API, here we simulate/demo

} catch (err) {
    console.error(err);
    resultDiv.innerHTML = '<p style="color:red">⚠️ Erreur lors de la recherche.</p>';
}

}