const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/createuser', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

function createUser(req, res, next) {
    userService.createUser(req.body)
        .then(() => res.json({"strMessage":"CREATED SUCCESSFULY"}))
        .catch(err => next(err));
}

function updateUser(req, res, next) {
    userService.updateUser(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteUser(req, res, next) {
    userService.deleteUser(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}