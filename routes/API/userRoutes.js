const router = require('express').Router();
const{
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

//id routes
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

//friend routes
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router; 