const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({

    isGold: {
        type: Boolean,
        default: false
    },

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }

});

const Customer = mongoose.model('Customer', customerSchema);

function validateGenre(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(customer);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateGenre;