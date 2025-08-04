const path = require('path');
const express = require("express");
const app = express();
require("dotenv").config({ debug: true });
const port = process.env.PORT || 3000;

const fs = require('fs');

// Middleware pour la limite de taille
app.use(express.json({ limit: `${process.env.MAX_FILE_SIZE_MB}mb` }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Servir les fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Créer le dossier d'upload si inexistant
const uploadDir = process.env.FILE_UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Routes
app.use("/etudiants", require("./routes/etudiants"));
app.use("/universites", require("./routes/universites"));
app.use("/certifications", require("./routes/certifications"));

app.listen(port, () => {
  console.log(`✅ API en écoute sur http://localhost:${port}`);
});
