const Member = require('../Models/Member')
const PaymentPlan = require('../Models/PaymentPlan')
const Payment = require('../Models/Payment')
const Management = require('../Models/Management')
const bcrypt = require('bcrypt');

const Controlls = {
    default: (req, res) => {
        res.send('Welcome to Triple T Gym Backend')
    },
    login: async (req, res) => {
        const results = await Management.findOne({ email: req.params.email.toLowerCase() });
        if (!results) {
            res.send({ isEmailCorrect: false, isPasswordCorrect: false });
            return;
        }
        bcrypt.compare(req.params.password, results.password, function (err, result) {
            if (!result) {
                res.send({ isEmailCorrect: true, isPasswordCorrect: result });
                return;
            }
            res.send({ isEmailCorrect: true, isPasswordCorrect: result, account: results });
        });
    },
    addManagementAccounts: async (req, res) => {
        const isAdminFound = await Management.findOne({ role: 'administrator' })
        if (!isAdminFound) {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash("tripleT!@v24", salt, async function (err, hash) {
                    const newAdmin = new Management({
                        "email": "admin@tripletgym.com",
                        "role": "administrator",
                        "password": hash
                    })
                    const result = await newAdmin.save()
                    // res.status(201).send(result)
                    // return;
                });
            });
        }
        const isProjectManagerFound = await Management.findOne({ role: 'operator' });
        if (!isProjectManagerFound) {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash("operator!@triplet", salt, async function (err, hash) {
                    const newOperator = new Management({
                        "email": "operator@tripletgym.com",
                        "role": "operator",
                        "password": hash
                    });
                    const result = await newOperator.save();
                    // res.status(201).send(result);
                    // return;
                });
            });
        }
        res.status(200).send({ message: 'Management accounts setup!' });
    },
    addMember: async (req, res) => {
        const newMember = new Member(req.body)
        const result = await newMember.save()
        if (result) {
            res.status(201).send(result)
            return;
        }
        res.status(404).send({ message: 'Error saving member!' });
    },
    addPaymentPlan: async (req, res) => {
        const newPaymentPlan = new PaymentPlan(req.body)
        const result = await newPaymentPlan.save()
        if (result) {
            res.status(201).send(result)
            return;
        }
        res.status(404).send({ message: 'Error saving payment plan!' });
    },
    addPayment: async (req, res) => {
        const newPayment = new Payment(req.body)
        const result = await newPayment.save();
        if (result) {
            res.status(201).send(result)
            return;
        }
        res.status(404).send({ message: 'Error saving payment!' });
    },
    getMembers: async (req, res) => {
        const results = await Member.find();
        res.status(200).send(results)
    },
    getPaymentPlan: async (req, res) => {
        const results = await PaymentPlan.find();
        res.status(200).send(results[0])
    },
    getPayments: async (req, res) => {
        const results = await Payment.find();
        res.status(200).send(results)
    },
    deleteMember: async (req, res) => {
        const results = await Member.deleteOne(req.params);
        if (results.deletedCount < 1) {
            res.status(404).send({ message: 'Error deleting member!' });
            return;
        }
        res.status(200).send(results);
    },
    updateMember: async (req, res) => {
        try {
            const filter = { email: req.body.email };
            const options = { upsert: true };
            const updateDoc = {
                $set: req.body
            };
            const result = await Member.updateOne(filter, updateDoc, options);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    updatePaymentPlan: async (req, res) => {
        try {
            const filter = { sixMonths: "" };
            const options = { upsert: true };
            const updateDoc = {
                $set: req.body
            };
            const result = await PaymentPlan.updateOne(filter, updateDoc, options);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = Controlls;