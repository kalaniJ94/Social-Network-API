const { Thought, User} = require('../models');

const thoughtController = {    //GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
             res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET one thought
    async getSingleThought(req,res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
                .select('.__v');

            if(!course){
                return res.status(404).json({message: 'No course with that ID'});
            }
             res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req,res) {
        try {
            const thought = await Thought.create(req.body);
            const User = await User.findByIdAndUpdate(
                req.body.userId,
                {$addToSet: {thoughts: thought._id}},
                {runValidators: true, new: true }
            ); 
             res.status(200).json(User, thought);
        } catch (err) {
            console.log(err);
             res.status(500).json(err);
        }
    },
    async updateThought(req,res){
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                {$set: req.body },
                {runValidators: true, new: true}    
            );
        if(!thought){
             res.status(404).json({message: 'No thought found with that ID!'});
        }
         res.status(200).json(thought);
        } catch (err) {
            console.log(err);
             res.status(500).json(err);
        }
    },
    async deleteThought(res,req){
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought){
                 res.status(404).json({message: 'No thought found with that ID'});
            }
             res.status(200).json(thought);
        } catch (err) {
            console.log(err);
             res.status(500).json(err);
        }
    },

    // reaction routes
    async addReaction(req, res) {
        try {
          const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true }
          );
    
          if (!reaction) {
             res.status(404).json({ message: "No thought with that ID" });
          }
    
           res.status(200).json(reaction);
        } catch (err) {
          console.log(err);
           res.status(500).json(err);
        }
      },
      async deleteReaction(req, res) {
        try {
          const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!reaction) {
             res
              .status(404)
              .json({ message: "Check thought and reaction ID" });
          }
    
           res.status(200).json(reaction);
        } catch (err) {
          console.log(err);
           res.status(500).json(err);
        }
      },
};

module.exports = thoughtController; 