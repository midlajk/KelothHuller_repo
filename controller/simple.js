const express = require('express');

const mongoose = require('mongoose');
require('../models/employees_model');
const Attendance = mongoose.model('Attendance')
const router = express.Router();
router.get('/attendanceList', (req, res) => {
    Attendance.find({}) // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(documents => {
                    return {
                        name: documents.name

                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/attendanceList', {
                date: "Search",
                usersDocuments: context.usersDocuments,


            })
        })
        .catch(error => res.status(500).send(error))

})


router.post('/attendanceList', (req, res) => {

    Attendance.find({ name: req.body.name }) // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(documents => {
                    return {
                        details: documents.date

                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/attendanceList', {
                date: req.body.name,
                usersDocuments: context.usersDocuments,


            })
        })
        .catch(error => res.status(500).send(error))
})
module.exports = router;