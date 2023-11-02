const { Thought, User} = require('../models');

module.exports = {
    //GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
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
            res.json(course);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req,res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
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
            return res.status(404).json({message: 'No thought found with that ID!'});
        }
        res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(res,req){
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought){
                return res.status(404).json({message: 'No thought found with that ID'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //Insert reaction routes
};