const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, sauceController.getAllSauces);
router.get('/:id', authMiddleware, sauceController.getSingleSauce);
router.post('/', authMiddleware, sauceController.createSauce);
router.put('/:id', authMiddleware, sauceController.updateSauce);
router.delete('/:id', authMiddleware, sauceController.deleteSauce);
router.post('/:id/like', authMiddleware, sauceController.likeSauce);

module.exports = router;
