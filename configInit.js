const nunjucks = require("nunjucks");

module.exports = (
  tempPath = "views",
  opts = {
    autoescape: true,
    throwOnUndefined: true,
    noCache: true
  }
) => {
  nunjucks.configure(tempPath, opts);
};
