/**密码验证 */
module.exports = app => {
    const pswAuth = require("../auth/pswAuth");
    const tokenUtil = require("../auth/tokenUtil");
    var router = require("express").Router();
    /**登录 */
    router.get('/pswlogin', pswAuth.authPswLogin, tokenUtil.createToken);
    /**注册 */
    router.post('/pswsignup', pswAuth.authPswSignUp);
    app.use('/auth', router);
};