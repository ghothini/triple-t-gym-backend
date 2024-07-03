const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    gender: {type: String, required: true},
    email: {type: String},
    cellphone: {type: String},
    emergencyCellphone: {type: String},
    homeAddr: {type: String, required: true},
    joinDate: {type: String, required: true},
    existingMember: {type: String, required: true},
    membershipNo: {type: String, required: true}
})

module.exports = mongoose.model('Members',MemberSchema)