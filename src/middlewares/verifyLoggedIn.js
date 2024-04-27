const jwt = require("jsonwebtoken");

const verifyLoggedIn = async (req, res, next) => {
  try {
    const token= req.headers.authorization;
    if (!token) {
      res.status(400).json({
        message: "You have to login first to post Job !!",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.currentUserId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyLoggedIn;