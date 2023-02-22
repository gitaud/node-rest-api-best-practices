const router = require("express").Router();
const memberController = require("../../controllers/memberController");

router.get("/", memberController.getAllMembers);

router.get("/:memberId", memberController.getOneMember);

router.post("/", memberController.createNewMember);

router.patch("/:memberId", memberController.updateOneMember);

router.delete("/:memberId", memberController.deleteOneMember);

module.exports = router; 