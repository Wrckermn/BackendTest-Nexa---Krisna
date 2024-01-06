const { createKry, getKry, updateKry, disableKry } = require('../controllers/karyawanController');
const router = require('express').Router();
const { checkToken } = require('../../auth/validation/tokenValidation');

router.post("/create",checkToken,createKry);
router.get("/list",checkToken,getKry);
router.post("/update",checkToken,updateKry);
router.get("/disable/:nip",checkToken,disableKry);

module.exports = router;
