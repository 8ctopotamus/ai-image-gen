const router = require('express').Router()
const { generateImage } = require('../controllers/openai')

router.post('/generateimage', generateImage)

module.exports = router