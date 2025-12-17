const express = require('express')
const router = express.Router()



router.get('/', (req, res) => {
    res.send('This is the users page')
})

router.get('/new', (req, res) => {
    res.send('This is the users page for new users')
})
router.get('/greet', (req, res) => {

    res.json({message: `Hello, ${req.query.name }`})
})


router.get('/:id', (req, res) => {
    userID = req.params.id
    res.send(`This is the user with user ID ` + userID)
})



module.exports = router 