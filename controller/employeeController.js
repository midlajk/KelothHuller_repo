const express = require('express');

const mongoose = require('mongoose');

require('../models/employees_model');
var fs = require("fs"),
    util = require("util");

var content = fs.readFileSync('index.txt', 'utf8');


var flag = 0;

var notter;



//including model class

const Employee = mongoose.model('Employee')
const Person = mongoose.model('Individual')
const Attendance = mongoose.model('Attendance')
const Mark = mongoose.model('Mark')
const Personal = mongoose.model('Personal')

const router = express.Router();

router.get("/", (req, res) => {

    Person.find() // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        name: document.names

                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/addOrEdit', {

                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))



})


// handle the post 

router.post('/', (req, res) => {
    insertRecord(req, res);



})

function insertRecord(req, res) {
    var sale = new Employee({
        date: req.body.date,
        name: req.body.name,
        sack: req.body.sack,

        worker: req.body.worker,




    });


    if (content < req.body.worker) {
        content = req.body.worker;

        fs.writeFile("index.txt", content, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });

    }





    var pushing = [req.body.num0, req.body.num1, req.body.num2, req.body.num3, req.body.num4, req.body.num5, req.body.num6, req.body.num7, req.body.num8, req.body.num9, req.body.num10, req.body.num11]

    var kooli = (req.body.sack / req.body.worker) * req.body.kooli;
    var sack = req.body.sack / req.body.worker;

    console.log("kooli :" + kooli);
    console.log("sack :" + sack);

    sale.kooli = kooli;

    for (let index = 0; index < req.body.worker; index++) {
        sale.workername.push(pushing[index]);
        Person.countDocuments({ names: pushing[index] }, function(err, count) {
            if (count > 0) {
                updateIndividual(pushing[index]);
                //document exists });
            } else {
                createindividual(pushing[index]);
            }
        });




    }

    function updateIndividual(index) {
        Person.findOne({ names: index }, function(errs, datas) {
            if (errs) {
                res.send(errs);
            } else {
                console.log(datas);
                datas.updateOne({
                        $push: {
                            "details": {
                                date: req.body.date,
                                kooli: kooli,
                                chack: sack,
                                sellername: req.body.name
                            }
                        }
                    }, { safe: true, upsert: true },
                    function(err, model) {
                        console.log(err);
                    }
                );
            }

        });


    }

    function createindividual(data) {
        var individual = new Person({
            names: data,
            details: [{
                date: req.body.date,
                kooli: kooli,
                chack: sack,
                sellername: req.body.name
            }]




        });
        individual.save(function(err) {
            if (err) return handleError(err);
            // saved!
        });
    }




    sale.save(function(err) {
        if (err) return handleError(err);
        // saved!
    });
    res.redirect('employee/list');





}


router.get('/list', async(req, res) => {
    // get all items from db collection

    Employee.find() // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        date: document.date,
                        name: document.name,
                        sack: document.sack,
                        kooli: document.kooli,
                        worker: document.worker,
                        workername: document.workername
                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/list', {
                colspan: content,
                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))
})
router.post('/filterlist', async(req, res) => {
    // get all items from db collection

    Employee.find({
            $or: [{ name: req.body.name }, { date: req.body.date }]
        }) // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        date: document.date,
                        name: document.name,
                        sack: document.sack,
                        kooli: document.kooli,
                        worker: document.worker,
                        workername: document.workername
                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/list', {
                colspan: content,
                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))
})



router.get('/account', (req, res) => {
    res.render("employee/account", {

    })
})

router.get('/individual', (req, res) => {
    Person.find() // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        name: document.names

                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/individual', {

                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))





})
router.get('/addEmp', (req, res) => {

    Attendance.find() // <=> wrapper for Model.find() ...
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
            res.render('employee/addEmp', {

                message: "Add new worker",
                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))
})
router.post('/addEmp', (req, res) => {
    Attendance.countDocuments({ name: req.body.name }, function(err, count) {
        if (count > 0) {
            Attendance.find() // <=> wrapper for Model.find() ...
                .then(documents => {
                    // create context Object with 'usersDocuments' key
                    const context = {
                        usersDocuments: documents.map(documents => {
                            return {
                                name: documents.name

                            }

                        })
                    }

                    res.render('employee/addEmp', {
                        message: req.body.name + " Already Added",
                        usersDocuments: context.usersDocuments

                    })
                })

        } else {
            var mark = new Attendance({
                name: req.body.name,

            });
            mark.save(function(err) {
                if (err) return handleError(err);
                // saved!
            });
            Attendance.find() // <=> wrapper for Model.find() ...
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
                    res.render('employee/addEmp', {
                        message: "successfully added " + req.body.name,

                        usersDocuments: context.usersDocuments

                    })
                })
                .catch(error => res.status(500).send(error))
        }
    });






})




router.get('/addAttend', (req, res) => {
    var datetime = new Date().toISOString().slice(0, 10);

    Attendance.find() // <=> wrapper for Model.find() ...
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
            res.render('employee/addAttend', {

                usersDocuments: context.usersDocuments,
                date: "Mark leave of " + datetime

            })
        })
        .catch(error => res.status(500).send(error))

})
router.post('/addAttend', (req, res) => {

    var attendance = req.body.worker;
    console.log(attendance);

    var add = new Mark({
        date: req.body.date

    })

    for (let index = 0; index < attendance.length; index++) {

        add.worker.push(attendance[index]);
        var set = new Personal({
            name: attendance[index],



        });
        set.date.push(req.body.date);

        set.save(function(err) {
            if (err) return handleError(err);
            // saved!
        });

    }
    add.save(function(err) {
        if (err) return handleError(err);
        // saved!
    });

    res.render('employee/accountlist')



})
router.get('/accountlist', (req, res) => {
    Personal.find() // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(document => {
                    return {

                        name: document.name,

                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/accountlist', {

                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))




})
router.post('/viewAttend', (req, res) => {

    Mark.find({ date: req.body.date }) // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(documents => {
                    return {
                        details: documents.worker

                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/accountlist', {
                date: req.body.date,
                usersDocuments: context.usersDocuments,


            })
        })
        .catch(error => res.status(500).send(error))
})
router.post('/viewLeave', (req, res) => {

    Personal.find({ name: req.body.name }) // <=> wrapper for Model.find() ...
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
            res.render('employee/accountlist', {
                date: req.body.name,
                usersDocuments: context.usersDocuments,


            })
        })
        .catch(error => res.status(500).send(error))
})






router.post('/insert', (req, res) => {

    Person.find({ names: req.body.woker }) // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(documents => {
                    return {
                        details: documents.details,

                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/individuallist', {
                employeeName: req.body.woker,
                usersDocuments: context.usersDocuments,


            })
        })
        .catch(error => res.status(500).send(error))
})





module.exports = router;