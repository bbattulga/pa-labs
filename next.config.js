const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
require("dotenv").config({ path: "./.env" });
const webpack = require("webpack");
const path = require("path");
require("./database");

module.exports = withPlugins([[withSass], [withImages]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  // env: {
  //   API_URL: "http://localhost:8080",
  //   DB_HOST: "35.238.220.1",
  //   DB_USER: "battulga",
  //   DB_PASS: "admin",
  //   DB_NAME: "battulga",
  // },
});
