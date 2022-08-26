const jwt = require("jsonwebtoken");
const Admin = require("../Models/AdminModel");

module.exports.checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "nabeel incubation", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        console.log('no token verify');
        console.log(err);
        next();
      } else {
        const admin = await Admin.findById(decodedToken.id);
        if (admin) {
          res.json({ status: true, admin: admin.email });
        } else {
          res.json({ status: false });
          console.log('no admin');
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    console.log('no admin token');
    next();
  }
};
