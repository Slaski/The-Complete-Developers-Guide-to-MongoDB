const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.find({
      'geometry.coordinates': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: 200000
        }
      }
    })
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate(driverId, driverProps)
      .then(() => Driver.findById(driverId))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove(driverId)
      .then(driver => {
        res.status(204).send(driver);
      })
      .catch(next);
  }
};
