const nunjucks = require("nunjucks");
const fs = require("fs");

const njkInit = require("./configInit.js");
const generateVue = require("./vue-generator.js");
const tableModel = require("./models/table.js");

njkInit();

generateVue("crud.njk", `${tableModel.name}/index.vue`, tableModel);
