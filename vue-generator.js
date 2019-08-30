const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");

module.exports = (tempName, targetPath, model) => {
  if (!tempName || !targetPath || !model) {
    throw new TypeError("arguments is required");
  }
  const res = nunjucks.render(tempName, {
    parentTemp: "vue-base.njk",
    ...model
  });

  const relativePath = `./dist/${targetPath}`;
  const parentPath = path.resolve(relativePath, "..");
  

  if (!fs.existsSync(parentPath)) {
    fs.mkdirSync(parentPath, { recursive: true });
  }

  fs.writeFile(relativePath, res, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Generate successfully!
      at: ${relativePath}`);
    }
  });
};
