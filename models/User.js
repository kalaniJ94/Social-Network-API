const {Schema, model } = require('mongoose');
//const assignmentSchema equivilant

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            //$trim
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //make something to match a valid email address, use validators
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Friends'
        },],
    },
    {
        toJSON:{
            virtuals: true,
        }
    }
)

const User = model('user', userSchema);

model.exports = User;