const JWT = require("jsonwebtoken");

const secret = "$uperMan@123";

function createTokenForUser(user) {
  console.log("User:"+user)
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  console.log("payload::"+payload)
  return payload;
}

module.exports = {
    createTokenForUser,
  validateToken,
};
