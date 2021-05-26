const db = require("../models");
const Record = db.record;
const { v4: uuidv4 } = require('uuid');
/**Op for operator */
const Op = db.Sequelize.Op;

/**Create and Save a new Record */
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_uuid) {
    /**Response HTTP 400 Bad Request */
    res.status(400).send({
      message: "Requiring the ID of User."
    });
    return;
  }

  /**Create a new Record */
  const record = {
    user_uuid: req.body.user_uuid ? req.body.user_uuid : 2,
    record_id: req.body.rid ? req.body.rid : uuidv4(),
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  /**Save Record in the database persistently */
  Record.create(record)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Record."
      });
    });
};

// Retrieve all Records from the database.
exports.findByRid = (req, res) => {
  const rid = req.query.rid;
  var condition = rid ? { record_id: { [Op.like]: `${rid}` } } : 1; //online state likely only

  Record.findAll({ where: condition })
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

// Retrieve all Records from the database.
exports.findByUUID = (req, res) => {
  const uuid = req.params.uuid;
  var condition = uuid ? { user_uuid: { [Op.like]: `%${uuid}%` } } : null; //uuid likely

  Record.findAll({ where: condition })
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

/**Find a single Record with a primary key */
exports.findOne = (req, res) => {
  const id = req.params.id;
  /** */
  Record.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Record with uuid=" + id
      });
    });
};

// Update a Record by the rid in the request
exports.update = (req, res) => {
  const rid = req.params.rid;

  Record.update(req.body, {
    where: { record_id: rid }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Record was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Record with uuid=${rid}. Maybe Record was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Record with " + rid
    });
  });
};

// Delete a Record with the specified rid in the request
exports.delete = (req, res) => {
  const rid = req.params.rid;

  Record.destroy({
    where: { record_id: rid }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Record was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Record with uuid=${rid}. Maybe Record was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete Record with uuid=" + rid
    });
  });
};

// Delete all Records from the database.
exports.deleteAll = (req, res) => {
  Record.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({ message: `${nums} Records were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials."
    });
  });
};
