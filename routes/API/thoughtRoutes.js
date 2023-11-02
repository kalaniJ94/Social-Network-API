const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');

//routes without IDs
router.route('/').get(getThoughts).post(createThought);

// routes with IDs
router
    .route('/:thoughtID')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router; 