const rateLimit = require("express-rate-limit");
const { logEvent } = require("./logger");

const loginLimitter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: "Too many login attemp! Try again after 1 minute.." },
  handler: (req, res, next, options) => {
    logEvent(
      `Too Many Requests ${options.message.message} /t ${req.method} /t${req.url} /t ${req.header.origin}`,
      "errLog.Log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = loginLimitter;
