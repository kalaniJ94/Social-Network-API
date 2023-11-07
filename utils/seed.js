const connection = require('../config/connection');
const { User, Thought, Reaction }= require('../models');

const mongoose = require('mongoose');

const users = [
    {
        username: 'KalaniJ',
        email: "kalani@gmail.com",
        thought: ['Hello World'],
    },
    {
        username: 'Lizzy',
        email: 'lizzy@gmail.com',
    },
    {
        username: 'Mars Bars',
        email: 'mars@bars.com',
    }
];

console.log(connection);

connection.once("open", async () => {
    console.log("Connection");

    await User.deleteMany({});

    await User.collection.insertMany(users);

    console.table(users);
    console.info("Seeded!");
    process.exit(0);
});