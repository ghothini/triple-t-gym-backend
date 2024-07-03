const mongoose = require('mongoose');

const PaymentPlanSchema = mongoose.Schema({
    month: {type: String, required: true},
    sixMonths: {type: String, required: true},
    twelveMonths: {type: String, required: true}
})

module.exports = mongoose.model('PaymentPlans',PaymentPlanSchema)