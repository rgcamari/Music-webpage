const express = require('express');
const { getUsers, getUserListOutput } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.get('/list', getUserListOutput);

module.exports = router;
