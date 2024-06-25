
module.exports = app => {
    const Data = require("../controllers/main.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/data", Data.findAll);

    router.get("/", Data.Welcome);

    router.post("/upload", upload.single('file'), Data.Cargar);

    app.use('/pac/', router);
  };