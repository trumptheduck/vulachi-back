const controller = require("../../controllers/school.js")
const permission = require("../../middlewares/permission.js")
const router = require("express").Router();

// router.post('/create',permission.getIdentity , permission.hasRole(['teacher','moderator','admin']), controller.create)

// router.post('/delete',permission.getIdentity , permission.hasRole(['teacher','moderator','admin']), controller.delete)

// router.get('/getall', permission.getIdentity , permission.hasRole(['teacher','moderator','admin']), controller.getAll)

router.post('/create', controller.create)

router.post('/update', controller.update)

router.post('/delete', controller.delete)

router.get('/getall', controller.getAll)

router.get('/get', controller.getOne)

module.exports = router;
