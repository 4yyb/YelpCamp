const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*1000);
        const camp = new Campground({
            author: '6890bf118d77044480d3fc85',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quia praesentium sunt quae doloribus nostrum consequatur qui doloremque blanditiis assumenda, magni saepe tempore, officiis possimus id nobis voluptate, iste soluta?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dd8uvdu0y/image/upload/v1754922754/YelpCamp/ci7kgc47flzjbf2j7g5g.jpg',
                    filename: 'YelpCamp/ci7kgc47flzjbf2j7g5g'
                },
                {
                    url: 'https://res.cloudinary.com/dd8uvdu0y/image/upload/v1754922754/YelpCamp/mwqecwunoodzknrrsivl.jpg',
                    filename: 'YelpCamp/mwqecwunoodzknrrsivl'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});