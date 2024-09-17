const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    // console.log("token cookie value"+tokenCookieValue);
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      // console.log("user payload"+userPayload);
    } catch (error) {}

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
