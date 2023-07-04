const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvent = async (message, fileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd/HH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};
const logger = (req, res, next) => {
  logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  next();
};
module.exports = { logEvent, logger };
