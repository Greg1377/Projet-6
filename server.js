const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSanitizer = require('express-mongo-sanitize');
const app = express();

// Middlewares
app.use(bodyParser.json()); // Utilisation du middleware pour analyser les corps de requêtes en JSON
app.use(helmet()); // Utilisation du middleware Helmet pour renforcer la sécurité HTTP
app.use(expressSanitizer()); // Utilisation du middleware pour prévenir l'injection de code malveillant dans les champs MongoDB

// Connexion à la base de données
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Vérification de la connexion réussie à la base de données
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
