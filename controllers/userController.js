const { User, Thought } = require("../models");

const userController = {
  async getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => console.log(err) && res.status(500).json(err));
  },
  async getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  async createUser(req, res) {
    User.create({
      username: req.body.username,
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  async updateUser(req, res) {

    // Perform a direct query to the database using the mongo shell or a GUI to confirm the user exists
    User.findById(params.userId) // Using findById for direct ID check
      .then((user) => {
        if (!user) {
          console.log("User not found in the database with ID:", params.userId);
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // User exists, proceed with update
        User.findOneAndUpdate({ _id: params.userId }, body, {
          new: true,
          runValidators: true,
        })
          .then((updatedUser) => {
            res.json(updatedUser);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "An error occurred", error: err });
          });
      })
      .catch((err) => {
        console.error("Error finding user:", err);
        res
          .status(500)
          .json({
            message: "An error occurred while finding the user",
            error: err,
          });
      });
  },
  async deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany( { username: user.username})
              .then((thoughts) => 
                !thoughts
                ? res.status(404).json({ message: 'No thoughts for that user' })
                : res.json(user)
              )
            )
        .catch((err) => res.status(500).json(err));
  },
  // friend routes
  async addFriend(req, res) {
    User.findOne({ _id: req.params.friendId })
      .select('-__v')
      .then((user) => {
          return User.findOneAndUpdate (
            { _id: req.params.userId}, 
            {$addToSet: {
                friends: user._id
            }},
            { new: true} 
          );
      }).then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  async removeFriend(req, res) {
    User.findOne({ _id: req.params.friendId })
    .select('-__v')
    .then((user) => {
        return User.findOneAndUpdate (
          { _id: req.params.userId}, 
          // missing a nested object for the user to remove??
          {$pull: {
              friends: user._id
          }},
          { new: true} 
        );
    }).then((user) => 
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
}
};
module.exports = userController;
