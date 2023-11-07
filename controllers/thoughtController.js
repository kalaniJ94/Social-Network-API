const { Thought,  User} = require('../models');

const thoughtController = {    //GET all thoughts
    async getThoughts(req, res) {
        Thought.find({})
        .then(thought => res.json(thought))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //GET one thought
    async getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .populate('reactions')
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },

    async createThought(req,res) {
        Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
        }).then((thought) => {
            return User.findOneAndUpdate( 
                { username: req.body.username }, {
                    $addToSet: { thoughts: Thought._id }
                }, { new: true}
            );
        }).then((user) =>
            !user
                ? res.status(404).json({
                message: 'Error creating thought - no user with that ID' })
                : res.json(user)
        ).catch((err) => {
            console.log(err);
            res.status(500).json(err);
      })
    },
    async updateThought(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            {
              thoughtText: req.body.thoughtText,
              username: req.body.username
            }, 
            { new: true, runValidators: true }
          )
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error updating thought', err });
          });
    },
    async deleteThought(res,req){
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : User.findOneAndUpdate(
            { thoughts: req.params.ObjectId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
    )
    .then((user) =>
      !user
        ? res.status(404).json({
            message: 'Error deleting thought',
          })
        : res.json({ message: 'Thought successfully deleted!' })
    )
    .catch((err) => res.status(500).json(err));
    },

    // reaction routes
    async addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          )
            .then((thought) =>
              !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(`Reaction added`)
            )
            .catch((err) => res.status(500).json(err));
      },
      async deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          )
            .then((thought) =>
              !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(`Reaction deleted`)
            )
            .catch((err) => res.status(500).json(err));
      },
};

module.exports = thoughtController; 