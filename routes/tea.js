const express = require('express'); // import express
const router = express.Router();
const teaController = require('../controllers/tea');
// const multer = require('multer');
// const upload = multer();

router.get('/tea', teaController.getAllTea);
router.post('/tea', teaController.uploadImg, teaController.newTea);
router.delete('/tea', teaController.deleteAllTea);

router.get('/tea/:name', teaController.getOndTea);
router.post('/tea/:name', teaController.newComment);
router.delete('/tea/:name', teaController.deleteOneTea);

module.exports = router; // export to use in server.js