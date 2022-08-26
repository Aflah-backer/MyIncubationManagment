const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  section: { type: String },
  selected: { type: Boolean, default: false },
  slot_no: { type: Number },
  companyname: { type: String },
  user_email: { type: String },
});

const SlotModel = mongoose.model("slots", slotSchema);
module.exports = SlotModel;
