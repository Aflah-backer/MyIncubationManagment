const UserModel = require("../Models/UserModel");
const AdminModel = require("../Models/AdminModel");
const AppModel = require("../Models/AppsModel");
const SlotModel = require("../Models/SlotModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "nabeel incubation", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message === "incorrect Email")
    errors.email = "That email is not registerd";
  if (err.message === "incorrect Password")
    errors.email = "That Password is Incorrect";
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.adminlogin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const admin = await AdminModel.login(email, password);
    console.log("KD");
    const token = createToken(admin._id);
    res.cookie("jwt", token, {
      withCrdentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ admin: admin._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.newdata = async (req, res, next) => {
  try {
    const datas = await AppModel.find({ status: "New" });
    res.json({ datas, status: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.pendingApplications = async (req, res, next) => {
  try {
    const data = await AppModel.find({ status: "Pending" });
    res.json({ data, status: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.allApplications = async (req, res, next) => {
  try {
    const data = await AppModel.find({});
    res.json({ data, status: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.changeStatus = async (req, res, next) => {
  try {
    const datas = req.body;
    const data = await AppModel.findByIdAndUpdate(
      { _id: datas.id },
      { status: datas.status }
    );
    res.json({ data, datas, status: "Pending" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.allSlots = async (req, res, next) => {
  try {
    const slots = await SlotModel.find();
    res.json(slots);
  } catch (err) {
    console.log(err);
  }
};

module.exports.slotUpdate = async (req, res, next) => {
  try {
    console.log(1);
    console.log(req.body);
    const { appId, slotId, slotSection, slotnumber } = req.body;
    const appData = await AppModel.findOneAndUpdate(
      { _id: appId },
      {
        $set: {
          bookingStatus: true,
          slotCode: slotId,
          section: slotSection,
          slot_no: slotnumber,
          status: "Booked",
        },
      }
    );
    const data = await SlotModel.findOneAndUpdate(
      { _id: slotId },
      {
        $set: {
          selected: true,
          companyname: appData.companyName,
          user_email: appData.email,
        },
      }
    );
    res.json({ appData, data, status: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewApplication = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await AppModel.findById({ _id: id });
    console.log(data);
    res.json({ data, status: true });
  } catch (err) {
    console.log(err);
  }
};
