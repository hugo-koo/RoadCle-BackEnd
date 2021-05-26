module.exports = app => {
    const tokenUtil = require("../auth/tokenUtil");
    var router = require("express").Router();
    // 创建
    router.post("/", tokenUtil.createToken);
    // 验证测试
    router.get("/", tokenUtil.authenticateToken, tokenUtil.test);
    app.use('/token', router);
};