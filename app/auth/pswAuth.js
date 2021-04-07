/**
 * 密码验证工具
 */
const { v4: uuidv4 } = require('uuid');
const tokenUtil = require('./tokenUtil')
const db = require("../models");
const User = db.user;
const UserInfo = db.userInfo;
/**Op for operator */
const Op = db.Sequelize.Op;
/**Get user's uuid & password */
exports.authPswLogin = (req, res, next) => {
  const uuid = req.query.uuid;
  const psw = req.query.pws;
  var condition = uuid ? { uuid: { [Op.like]: `%${uuid}%` } } : null; //uuid likely

  User.findAll({ where: condition })
    .then(data => {
      if (psw === data[0].password) {
        console.log(uuid + 'login success');
        // tokenUtil.generateAccessToken(uuid);
        next();
      } else {
        console.log(uuid + 'login error');
        res.status(401);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
}

/**Post user's name & password */
exports.authPswSignUp = (req, res, next) => {
  // Validate request
  if (!req.body.name) {
    /**Response HTTP 400 Bad Request */
    res.status(400).send({
      message: "Requiring the NAME of user."
    });
    return;
  }
  // Create a User
  const user = {
    uuid: uuidv4(),
    name: req.body.name,
    password: req.body.password,
    online: req.body.online ? req.body.online : 0,
    avatar: req.body.avatar ? req.body.avatar : '',
    nickname: req.body.nickname ? req.body.nickname : '',
    sex: req.body.sex ? req.body.sex : 1,
    birthdate: req.body.birthdate,
    remark: req.body.remark,
    email: req.body.email,
    telephone: req.body.telephone,
    platform: req.body.platform,
  };
  // Check the name is uniquely or not
  var condition = user.name ? { name: { [Op.like]: `%${user.name}%` } } : null; //
  UserInfo.findAll({ where: condition }).then(data => {
    if (!data) {
      res.status(403).send({
        message:
          "This user name is occupied."
      });
    }
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving."
    });
  });
  // Save User in the database persistently
  User.create(user)
    .then(data => {
      // 获取用户uuid
      user.uuid = data.uuid;
      // res.send(user);
      console.log(user);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
  // 新增用户信息条目
  UserInfo.create(user)
    .then(data => {
      res.send(data);
      // res.stutas(200);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User info."
      });
    });
  // next();
}