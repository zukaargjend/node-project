const {Rental, validate} = require('../models/rental');
const mongoose = require('mongoose');
const express = require('express');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const router = express.Router();
// const Fawn = require("fawn");


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie');

    if(movie.numberInStock === 0) return res.status(400).send('Movie is not in stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
            numberInStock: movie.numberInStock
        }
    });
    // try {
    //     new Fawn.Task()
    //         .save('rentals', rental)
    //         .update('movies', { _id: movie._id }, {
    //             $inc: {numberInStock: -1 }
    //         })
    //         .run();
    //     res.send(rental);
    // }catch(ex){
    //     res.status(500).send('Something failed');
    // }
    for ( numberRental = 0; numberRental < movie.numberInStock; numberRental++) {
        rental = await rental.save();
        res.send(rental);
        if(movie.numberInStock === 0 || movie.numberInStock <= numberRental){
            console.log("there is no movie");
        }
        return;
    }return res.status(400).send('There is no movie in stock');
});


module.exports = router;