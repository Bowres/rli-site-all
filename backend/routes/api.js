const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Define routes
router.get('/', homeController.getHome);
router.get('/design-ideas', homeController.getDesignIdeas);
router.get('/magazine', homeController.getMagazine);
router.get('/cities', homeController.getCities);
router.get('/portfolio', homeController.getPortfolio);
router.get('/consultation', homeController.getConsultation);
router.post('/consultation', homeController.submitConsultation);
router.post('/calculate-price', homeController.calculatePrice);

module.exports = router;