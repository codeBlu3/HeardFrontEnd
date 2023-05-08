const { join } = require('path')
require("dotenv").config({ path: join(__dirname,  'variables.env') });
module.exports = {
  extra: {
    SERVERHOSTNAME: process.env.SERVERHOSTNAME,
  },
};
