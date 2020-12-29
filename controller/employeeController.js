const express = require('express');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

require('../models/employees_model');
var fs = require("fs"),
    util = require("util");

var content = fs.readFileSync('index.txt', 'utf8');


//including model class

const Employee = mongoose.model('Employee')
const Person = mongoose.model('Individual')
const Attendance = mongoose.model('Attendance')
const Mark = mongoose.model('Mark')
const Personal = mongoose.model('Personal')
const Userschema = mongoose.model('Userschema');

const router = express.Router();

//////////

// Handling user signup 

//Showing login form 

//////
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

    var datetime = new Date().toISOString().slice(0, 10);


    Mark.countDocuments({ date: datetime }, function(err, count) {
        if (count > 0) {
            showWindow(datetime);
            //document exists });
        } else {
            addAttendance();
        }
    });

    function showWindow(n) {
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
                    date: "Already added leave of " + n

                })
            })
            .catch(error => res.status(500).send(error))

    }

    function addAttendance() {
        var attendance = req.body.worker;
        console.log(attendance);

        var add = new Mark({
            date: datetime

        })
        for (let index = 0; index < attendance.length; index++) {

            add.worker.push(attendance[index]);
            Attendance.findOne({ name: attendance[index] }, function(errs, datas) {
                if (errs) {
                    res.send(errs);
                } else {
                    datas.updateOne({
                            $push: {
                                "date": datetime


                            }
                        }, { safe: true, upsert: true },
                        function(err, model) {
                            console.log(err);
                        }
                    );
                }

            });


        }
        add.save(function(err) {
            if (err) return handleError(err);
            // saved!
        });


        Attendance.find() // <=> wrapper for Model.find() ...
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



    }



})
router.get('/accountlist', (req, res) => {
    Attendance.find() // <=> wrapper for Model.find() ...
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

router.get('/addRent', (req, res) => {
    res.render('employee/addRent', {

    })
})
router.post('/addRent', (req, res) => {
    var set = new Personal({
        date: req.body.date,
        name: req.body.name,
        load: req.body.load,
        rent: req.body.rent,
        chack: req.body.sack


    })
    set.save(function(err) {
        if (err) return handleError(err);
        // saved!
    });
    Personal.find() // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        date: document.date,
                        name: document.name,
                        load: document.load,
                        rent: document.rent,
                        chack: document.chack,
                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/viewRent', {
                title: "new Load Rent Added",
                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))



})
router.get('/viewRent', (req, res) => {
    Personal.find() // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        date: document.date,
                        name: document.name,
                        load: document.load,
                        rent: document.rent,
                        chack: document.chack,
                    }

                })
            }

            // rendering usersDocuments from context Object
            res.render('employee/viewRent', {
                title: "complete rent",
                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))


})

router.post('/filterrent', async(req, res) => {
    // get all items from db collection

    Personal.find({
            $or: [{ name: req.body.name }, { date: req.body.date }]
        }) // <=> wrapper for Model.find() ...
        .then(documents => {
            // create context Object with 'usersDocuments' key
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        date: document.date,
                        name: document.name,
                        load: document.load,
                        rent: document.rent,
                        chack: document.chack,
                    }

                })
            }
            var s;
            if (!req.body.name) {
                s = req.body.date;
            } else {
                s = req.body.name;
            }

            // rendering usersDocuments from context Object
            res.render('employee/viewRent', {
                title: "Filtered list of : " + s,
                usersDocuments: context.usersDocuments

            })
        })
        .catch(error => res.status(500).send(error))
})



router.get('/userSignup', (req, res) => {


    // rendering usersDocuments from context Object
    res.render('employee/userSignup', {
        name: "add new user"
    })

})
router.post('/userSignup', (req, res) => {
    var password = new Userschema({
        username: req.body.name

    });
    password.save(function(err) {
        if (err) return handleError(err);
        // saved!
    });

    // rendering usersDocuments from context Object
    res.render('employee/userSignup', {
        name: "user " + req.body.name + "added successfully"
    })

})
router.get('/change', (req, res) => {


    // rendering usersDocuments from context Object
    res.render('employee/change', {})

})




module.exports = router;