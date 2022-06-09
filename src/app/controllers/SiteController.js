const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {

    // [GET] /
    index(req, res, next) {
    
        Course.find({})
            .then((courses) => 
                res.render('home', {
                        courses : multipleMongooseToObject(courses)
                     }
                ))
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    // [GET] /log-out

    logOut(req, res) {
        res.render('log-out');
    }
}

module.exports = new SiteController;