const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Email is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is Required"],
  },
});

adminSchema.statics.login = async function(email, password) {
    const admin = await this.findOne({ email });
    
    if (admin) {
      if (admin.password == password) {
        return admin;
      }
      throw Error("Incorrect Password!");
    } else {
      throw Error("Incorrect Email!");
    }
  };

module.exports = mongoose.model("admins", adminSchema);
