/**密码验证 */
module.exports = app => {
    const pswAuth = require("../auth/pswAuth");
    const tokenUtil = require("../auth/tokenUtil");
    var router = require("express").Router();
    /**登录 */
    router.get('/login', pswAuth.authPswLogin, tokenUtil.createToken);
    router.post('/signup', pswAuth.authPswSignUp);
    app.use('/u', router);
};