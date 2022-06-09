
const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /course/:slug
    detail(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => 
                 res.render('courses/details', {
                        course: mongooseToObject(course),
                    }),
                 )
                 .catch(next);
    }

    // [POST] /course/create
    create(req, res, next) {
        res.render('courses/create');
    };

    // [GET] /course/store
    store(req, res, next) {
        const formData = {...req.body};
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
              .save()
              .then(() => res.redirect('/me/stored/courses'))
              .catch(() => {})
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
               .then((course) => 
                    res.render('courses/edit', {
                        course: mongooseToObject(course),
                    }),
               )
               .catch(next);
    }

     // [PUT] /courses/:id
     update(req, res, next) {
         Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
     }

     // [PATCH] /courses/:id/restore
     restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
     }

     // DELETE /course/:id
     delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
     }

    // DELETE /course/:id/force
     forceDelete(req, res, next) {
         Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
     }

     // [POST] /course/handle-form-actions
     handleFormActions(req, res, next) {
         switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } }) // $in select array 
                .then(() => res.redirect('back'))
                .catch(next);
                break;
            default:
                res.json({ message : ' action is valid ' });        
         }
     }
}

module.exports = new CourseController();
