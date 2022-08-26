const UserModel = require("../Models/UserModel");
const AppsModel = require("../Models/AppsModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "nabeel incubation", {
    expiresIn: maxAge,
  });
};

const checkUser = (token) => {
  return jwt.verify(token, "nabeel incubation", async (err, decodedToken) => {
    if (err) {
      console.log(err);
    } else {
      return await UserModel.findById(decodedToken.id);
    }
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message === "Incorrect Email") {
    errors.email = "Entered Email is incorrect or not registered";
  }
  if (err.message === "Incorrect Password") {
    errors.password = "Entered Password is incorrect";
  }
  if (err.message === "Application is already submitted") {
    errors.application = "Application is already submitted";
  }
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    errors.application = "Application is already submitted";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCrdentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCrdentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ data: user, user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.userApplication = async (req, res, next) => {
  try {
    const user = await checkUser(req.body.userId);
    const userId = user._id;
    // console.log("req.body");
    // console.log(req.body);
    const {
      name,
      email,
      address,
      city,
      state,
      phoneNo,
      companyName,
      team,
      product,
      problem,
      solution,
      proposition,
      competators,
      revenue,
      market,
      plan,
      type,
      proposal,
      slot_no,
    } = req.body;

    const application = await AppsModel.create({
      name,
      email,
      address,
      city,
      state,
      phoneNo,
      companyName,
      team,
      product,
      problem,
      solution,
      proposition,
      competators,
      revenue,
      market,
      plan,
      type,
      proposal,
      slot_no,
      // status: "PENDING",
      userId,
      bookingStatus: false,
      // slotCode: "null",
    });
    console.log('after create');
    res.status(201).json({ name: application.name, created: true });
  } catch (err) {
    console.log(err);

    res.json({created: false });
  }
};

module.exports.getstatus = async (req, res, next) => {
  try {
    const user = await checkUser(req.params.id);
    const userId = user._id;
    console.log(userId);
    const getstatus = await AppsModel.findOne({ userId: userId });
    if (!getstatus) {
      res.json({ status: false });
    } else {
      res.json({ status: true, data: getstatus.status, id: getstatus._id });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewApplication = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await AppsModel.findById({ _id: id });
    console.log(data);
    res.json({ status: true, data });
  } catch (err) {
    console.log(err);
  }
};
