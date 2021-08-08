const router = require("express").Router();

const auth = require("../controller/auth-controller");
const frdRequest = require("../controller/frd-requests-controller");


router.get("/", auth.authUser, frdRequest.getAllRequests);
router.get("/:requestId", auth.authUser, frdRequest.getRequestById);
router.post("/", auth.authUser, frdRequest.addRequest);
router.delete("/:requestId", auth.authUser, frdRequest.deleteRequest);

module.exports = router;
