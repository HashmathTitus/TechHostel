// controllers/usageController.js

const Usage = require('../models/personalExpensesM.js');

const getAllUsage = async (req, res) => {
  try {
    const data = await Usage.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching usage data:", error);
    res.status(500).json({ success: false, error: "Error fetching usage data" });
  }
};

const createUsage = async (req, res) => {
  try {
    const data = new Usage(req.body);
    await data.save();
    res.send({ success: true, message: "Data saved successfully", data: data });
  } catch (error) {
    console.error("Error saving usage data:", error);
    res.status(500).json({ success: false, error: "Error saving usage data" });
  }
};

const updateUsage = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const data = await Usage.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "Data updated successfully", data: data });
  } catch (error) {
    console.error("Error updating usage data:", error);
    res.status(500).json({ success: false, error: "Error updating usage data" });
  }
};

const deleteUsage = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Usage.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully", data: data });
  } catch (error) {
    console.error("Error deleting usage data:", error);
    res.status(500).json({ success: false, error: "Error deleting usage data" });
  }
};

module.exports = { getAllUsage, createUsage, updateUsage, deleteUsage };
