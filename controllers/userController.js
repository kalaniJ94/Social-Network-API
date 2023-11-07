//friendCount method needed
const userController = { 
    async getUsers(req, res){
        try {
            const users = await User.find();
            const userObj = {
                users,
                friendCount: await friendCount(),
            }
             res.json(userObj);
        } catch (err) {
            console.log(err);
             res.status(500).json(err);
        }
    },
    async getSingleUser (req,res){
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v')
                .lean();

            if(!user){
                 res.status(404).json({message: 'No user found with that ID!'});
            }

            res.json({
                user,
                friends: await friends(req.params.userId),
            });
        } catch (err) {
            console.log(err);
             res.status(500).json(err);
        }
    },
    async createUser(req,res) {
        try {
            const User = await User.create(req.body);
             res.status(200).json(User);
        } catch (err) {
             res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const User = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if(!User){
                 res.status(404).json({message: 'No User found with that ID'});
            }
        res.status(200).json(User);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req,res){
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});
        if(!user){
             res.status(404).json({message: 'No user found with that ID'})
        }
        const thought = await Thought.findOneAndUpdate(
            { user: req.params.userId},
            {$pull: {users: req.params.userId} },
            { new: true }
        );
        if(!thought){
             res.status(404).json({ 
                message: 'User deleted, no thoughts found.'
            });
        }
         res.status(200).json({message: 'User has been successfully deleted.'})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // friend routes
    async addFriend(req,res){
        try {
            console.log("You are adding a friend. ");
            console.log(req.body);
            const User = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body} },
                {runValidators: true, new: true}
            );
            if(!user){
                 res.status(404).json({message: 'No user with that ID'})
            }
             res.status(200).json(user);
        } catch (err) {
             res.status(500).json(err);
        }
    },
    async removeFriend(req,res){
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: {friendId: req.params.friendId} } },
                {runValidators: true, new: true }
            );
            if(!user){
                 res.status(404).json({message:'No user found with that ID'});
            }

             res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
module.exports = userController;