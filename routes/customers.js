const express = require("express");
const router = express.Router();
const app = express();
const { Customer, validate } = require('../models/customer');

    const customers = [
        { id: 1, name: 'Customer 1' },
        { id: 2, name: 'Customer 2' },
        { id: 3, name: 'Customer 3' },
    ];

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    customer = await customer.save();

    res.send(customer);
});


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name},{
        new: true
    });

    if (!customer) return res.status(404).send('The genre with the given ID was not found.');

    res.send(customer);
});

router.delete('/:id', async(req, res) => {
    const genre = await Customer.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The genre with the given ID was not found.');

    res.send(customer);
});


module.exports = router;