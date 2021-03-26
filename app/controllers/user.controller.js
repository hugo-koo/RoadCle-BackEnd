const db = require("../models");
const User = db.user;
/**Op for operator */
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
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
    name: req.body.name,
    online: req.body.online ? req.body.online : 0,
    avatar: req.body.avatar ? req.body.avatar : '',
    nickname: req.body.nickname ? req.body.nickname : '',
    sex: req.body.sex ? req.body.sex : 1,
    birthdate: req.body.birthdate,
    remark: req.body.remark,
    telephone: req.body.telephone,
    platform: req.body.platform,
  };

  // Save User in the database persistently
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findByOnline = (req, res) => {
  const online = req.query.online;
  var condition = online ? { online: { [Op.like]: `%${online}%` } } : 1; //online state likely only

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving."
      });
    });
};

// Retrieve all Users from the database.
exports.findByUUID = (req, res) => {
  const uuid = req.params.uuid;
  var condition = uuid ? { uuid: { [Op.like]: `%${uuid}%` } } : null; //uuid likely

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

/**Find a single User with a primary key */
exports.findOne = (req, res) => {
  const uuid = req.params.uuid;
  /** */
  User.findByPk(uuid)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with uuid=" + uuid
      });
    });
};

// Update a User by the uuid in the request
exports.update = (req, res) => {
  const uuid = req.params.uuid;

  User.update(req.body, {
    where: { uuid: uuid }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with uuid=${uuid}. Maybe User was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating User with uuid=" + uuid
    });
  });
};

// Delete a User with the specified uuid in the request
exports.delete = (req, res) => {
  const uuid = req.params.uuid;

  User.destroy({
    where: { uuid: uuid }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete User with uuid=${uuid}. Maybe User was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete User with uuid=" + uuid
    });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({ message: `${nums} Users were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials."
    });
  });
};
