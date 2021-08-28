const router = require('express').Router();

router.use('/apis/user', require('./apis/user.js'));

router.use('/apis/school', require('./apis/school.js'));

router.use('/apis/course', require('./apis/course.js'));


module.exports = router;
