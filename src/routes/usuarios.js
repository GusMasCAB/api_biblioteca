const express = require('express');
const router = express.Router();
const {requiredScopes} = require('express-oauth2-jwt-bearer');
const usuarioController = require('../controllers/usuarioController');

router.get("/", requiredScopes("read: usuarios"), usuarioController.getAllUsuarios);
router.get("/:id", requiredScopes("read: usuarios"), usuarioController.getUsuarioById);
router.post("/", requiredScopes("write: usuarios"), usuarioController.createUsuario);
router.put("/:id", requiredScopes("write: usuarios"), usuarioController.updateUsuario);
router.delete("/:id", requiredScopes("write: usuarios"), usuarioController.deleteUsuario);

module.exports = router;