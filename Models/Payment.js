const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    membershipNo: { type: String, required: true },
    member: { type: String, required: true },
    monthForPayment: { type: String, required: true },
    dateOfPayment: { type: String, required: true },
    amout: { type: String, required: true },
    gender: { type: String, required: true },
    memberName: { type: String, required: true },
    joinDate: { type: String, required: true },
    status: { type: String, required: true },
    paymentType: { type: String, required: true }
})

module.exports = mongoose.model('Payments', PaymentSchema)