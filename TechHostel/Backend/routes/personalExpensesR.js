// routes/usageRoutes.js

const express = require('express');
const router = express.Router();
const usageController = require('../controllers/personalExpenses.js');

router.get("/", usageController.getAllUsage);
router.post("/create", usageController.createUsage);
router.put("/update", usageController.updateUsage);
router.delete("/delete/:id", usageController.deleteUsage);

module.exports = router;
