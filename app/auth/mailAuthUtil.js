const nodemailer = require("nodemailer");
// 定义邮件服务器
var transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    service: "yandex",
    port: 465,
    secure: true,
    // secureConnection: true,
    // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
    auth: {
        user: 'rc.idong@yandex.ru',
        pass: '65u8cDv@a@ArsEQ'
    },
    // tls: { ciphers: 'SSLv3' }
    // requiresAuth: true,
    // domains: ["hotmail.com", "outlook.com"],
});
var Auth = '1234';
var emailaddress;
exports.send = (req, res, next) => {
    // 获取前端传递过来的参数
    emailaddress = req.body.maddr;
    var html =
    `<div>
        <div>Auth code: ${Auth}</div>
        <div>To: ${emailaddress}</div>
    </div>`;

    var mailOptions = {
        // 发送邮件的地址
        from: 'rc.idong@yandex.ru', // login user must equal to this user
        // 接收邮件的地址
        to: emailaddress,  //
        // 邮件主题
        subject: 'Auth code',
        // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
        html: html,
    };
    // 发送邮件，并有回调函数
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // res.send(error);
            return console.log(error);
        }
        res.json({ message: emailaddress });
        console.log('Message sent: ' + info.response);
    });
    // res.status(200).json({ message: req.params.maddr });

};