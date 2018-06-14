
var path = require("path");

module.exports = function(app) {


  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../survey.html"));
  });

  app.get("/results", function(req, res) {
    res.sendFile(path.join(__dirname, "../results.html"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../home.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../home.html"));
  });
};
