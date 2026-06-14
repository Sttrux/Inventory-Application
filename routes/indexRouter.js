const {Router} = require("express");
const router = Router();
//indexController
const indexController = require("../controllers/indexController");


router.get("/", indexController.getHome);

module.exports = router;
// o deberia usar export en cada router y su metodo ? 