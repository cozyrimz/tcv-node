const express = require('express');
const router = express.Router();

const { getHubs, createHub, updateHub, deleteHub } = require('../controller/hub');

router.get('/getHubs', getHubs);
router.post('/newHub', createHub);
router.post('/updateHub', updateHub);
router.delete('/deleteHub/:id', deleteHub);

module.exports = router;
