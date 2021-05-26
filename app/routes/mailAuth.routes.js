module.exports = app => {
    var mailAuthUtil = require("../auth/mailAuthUtil")
    var router = require("express").Router();

    router.post("/", mailAuthUtil.send);
    app.use('/mail-auth', router);
};