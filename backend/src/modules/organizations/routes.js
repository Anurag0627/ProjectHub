const express = require("express"); 
const router = require("express").Router();

const authenticate = require("../../middleware/auth.middleware")
const orgController = require("./controller");
const { ro } = require("zod/v4/locales");

router.post("/", authenticate, orgController.createOrganization);
router.get("/", authenticate, orgController.getMyOrganization);
router.get("/:organizationId", authenticate, orgController.getOrganization);
router.post("/:organizationId/members", authenticate, orgController.inviteMember);
// router.get("/email", orgController.findMembershipByEmail);

module.exports = router;