module.exports = app => {
    const tests = require("../controllers/test.controller.js");

    var router = require("express").Router();

    // Create a new Test
    router.post("/", tests.create);

    // Retrieve all Tests
    router.get("/", tests.findAll);

    // Retrieve all published Tests
    router.get("/published", tests.findAllPublished);

    // Retrieve a single Test with id
    router.get("/:id", tests.findOne);

    // Update a Test with id
    router.put("/:id", tests.update);

    // Delete a Test with id
    router.delete("/:id", tests.delete);

    // Delete all Tests
    router.delete("/", tests.deleteAll);

    app.use('/tests', router);
};