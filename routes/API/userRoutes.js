const router = require('express').Router;
const{
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

//id routes
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router; 