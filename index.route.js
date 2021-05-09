const express = require('express');
const userRoutes = require('./server/gestus/gestus.router');
const authRoutes = require('./server/auth/auth.route');
const categorieRoutes = require('./server/categories/categorie.route')
const paiementRoutes = require('./server/paiement/paiement.route')
const jetonRoutes = require('./server/jeton/jeton.router')
const fournisseurRoutes = require('./server/fournisseur/fournisseur.router')
const newsletterRoutes = require('./server/newsletter/newsletter.router')
const produitRoutes = require('./server/produit/produit.router')
const pubRoutes = require('./server/pub/pub.router')
const testRoutes = require('./server/test/test.router')
const enchRoutes = require('./server/enchere/enchere.router')
const clientRoutes = require('./server/client/client.router')
const vainqueurRoutes = require('./server/vainqueur/vainqueur.router')




const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount categories routes at /categories
router.use('/categories', categorieRoutes);

// mount paiements routes at /paiements
router.use('/paiements', paiementRoutes);

// mount jeton routes at /jeton
router.use('/jetons', jetonRoutes);

// mount fournisseurs routes at /fournisseurs
router.use('/fournisseurs', fournisseurRoutes);

// mount newsletters routes at /newsletters
router.use('/newsletters', newsletterRoutes);

// mount peoduits routes at /peoduits
router.use('/produits', produitRoutes);

// mount peoduits routes at /peoduits
router.use('/pubs', pubRoutes);

// mount peoduits routes at /peoduits
router.use('/encheres', enchRoutes);

// mount clients routes at /clients
router.use('/clients', clientRoutes);

// mount vainqueurs routes at /vainqueurs
router.use('/vainqueurs', vainqueurRoutes);

module.exports = router;
