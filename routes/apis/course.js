const controller = require("../../controllers/course.js")
const permission = require("../../middlewares/permission.js")
const router = require("express").Router();

// router.post('/create/', permission.getIdentity , permission.hasRole(['teacher','moderator','admin']),controller.create)

// router.post('/create/:id', permission.getIdentity , permission.hasRole(['teacher','moderator','admin']),controller.createWithinSchool)

// router.post('/delete', permission.getIdentity , permission.hasRole(['teacher','moderator','admin']),controller.delete)

// router.post('/update', permission.getIdentity , permission.hasRole(['teacher','moderator','admin']),controller.update)

// router.get('/getall', permission.getIdentity , permission.hasRole(['teacher','moderator','admin']),controller.getAll)

// router.get('/get/:id', permission.getIdentity , permission.hasRole(['teacher','moderator','admin']),controller.getByID)


router.post('/create',controller.createWithinSchool)

router.post('/delete',controller.delete)

router.post('/update',controller.update)

router.get('/getall',controller.getAll)

router.get('/get/:id',controller.getByID)

module.exports = router;
