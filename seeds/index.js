const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});

    for(let i = 0; i < 250; i++){
        const rand1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*1000)+100;
        const camp = new Campground({
            
            author: '602eb13db68daa2b243b6a88',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/random/400x400',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum exercitationem blanditiis necessitatibus vitae odit ipsa recusandae nesciunt modi quo! Nihil recusandae nemo eum sint pariatur illum excepturi asperiores esse modi.',
            price,
            geometry: {
                type: "Point", 
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude,
                ],
                },
            images: [
                {
                    url: 'https://res.cloudinary.com/dthcbsgjy/image/upload/v1614108112/YelpCamp/dx5pnap2bayndktu4ezd.png',
                    filename: 'YelpCamp/dx5pnap2bayndktu4ezd'
                },
                {
                    url: 'https://res.cloudinary.com/dthcbsgjy/image/upload/v1614111150/YelpCamp/zmcrhgqsz3bbtcdqm6bz.jpg',
                    filename: 'YelpCamp/zmcrhgqsz3bbtcdqm6bz'
                }
              ],

        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});