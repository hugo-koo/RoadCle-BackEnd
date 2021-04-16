module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const tokenUtil = require("../auth/tokenUtil");
    var router = require("express").Router();

    // Create a new User
    // router.post("/", users.create);

    // Retrieve all online Users 
    router.get("/online", users.findByOnline);

    // Retrieve Users by uuid
    router.get("/:uuid", tokenUtil.authenticateToken, users.findByUUID);

    // Retrieve User name by name
    router.get("/n/:name", users.findByName);

    // Retrieve a single User with tid
    router.get("/tid/:id", users.findOne);

    // Update a User with uuid
    router.put("/:uuid", users.update);

    // Delete a User with id
    router.delete("/:uuid", users.delete);

    // Delete all Users
    router.delete("/all", users.deleteAll);

    app.use('/u', router);
};