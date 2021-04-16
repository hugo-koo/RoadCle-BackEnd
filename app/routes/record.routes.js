module.exports = app => {
    const records = require("../controllers/record.controller.js");

    var router = require("express").Router();

    // Create a new Record
    router.post("/", records.create); 

    // Retrieve all Records by rid
    router.get("/", records.findByRid);

    // Retrieve Records by user uuid
    router.get("/:uuid", records.findByUUID);

    // Retrieve a single Record with tid
    router.get("/tid/:id", records.findOne);

    // Update a Record with rid
    router.put("/:rid", records.update);

    // Delete a Record with rid
    router.delete("/:rid", records.delete);

    // Delete all Records
    router.delete("/all", records.deleteAll);

    app.use('/r', router);
};