const express = require('express');
const app = express();

app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.status(200).send("Backend Wave opérationnel");
});

// Webhook Wave
app.post('/wave/webhook', (req, res) => {
    const data = req.body;
    console.log("Webhook Wave reçu :", data);
    res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});