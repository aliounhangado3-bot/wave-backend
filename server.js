const express = require('express');
const app = express();

// Middleware ultra-puissant pour capturer TOUT le body brut
app.use((req, res, next) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        req.rawBody = data;

        // Tentative de parse JSON
        try {
            req.body = JSON.parse(data);
        } catch (e) {
            req.body = {}; // JSON invalide → on laisse vide
        }

        next();
    });
});

// Route de test
app.get('/', (req, res) => {
    res.status(200).send("Backend Wave opérationnel");
});

// Webhook Wave
app.post('/wave/webhook', (req, res) => {
    console.log("=== Webhook Wave reçu ===");
    console.log("Raw body :", req.rawBody);
    console.log("Parsed JSON :", req.body);

    res.status(200).send("OK");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
