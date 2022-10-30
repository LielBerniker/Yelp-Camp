
const mongoose = require('mongoose');
const Campground = require('../models/Campground');
const cities = require('./cities')
const {places,descriptors} = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {

});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 40)+10
        const camp = new Campground({
           location: `${cities[random1000].city}, ${cities[random1000].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           image:"https://source.unsplash.com/collection/483251",
           description: "    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rem natus soluta fugit provident, ipsum corrupti consequatur, perspiciatis nesciunt maxime laborum ex minus ut unde molestias odio deserunt doloremque reprehenderit.",
           price
        })
        await camp.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})