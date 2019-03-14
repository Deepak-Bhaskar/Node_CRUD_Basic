const User = require('../models/user')

// Simple version without validation pr sanitation
const test = (req, res) => {
  res.send('Greeting from the test controller')
}

// Create user
const user_create = (req, res, next) => {
  console.log('====  create controller ====', req.body)
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    mobile: req.body.mobile,
    password: req.body.password,
  })

  user.save((err) => {
    if (err) {
      return next(err)
    }
    res.send('User successfully created.')
  })
}

// Read user by Id
const user_detail_Id = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return next(err)
    }
    res.json(user)
  })
}

// Get list of all user
const user_list = (req, res) => {
  User.find((err, user) => {
    if (err) {
      return next(err)
    }
    res.json(user)
  })
}

// Update user by Id
const user_update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, user) => {
    if (err) {
      return next(err)
    }
    res.send(user)
  })
}

// Delete user

const user_delete = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return next(err)
    }
    res.send('User delete successfully')
  })
}

module.exports = {
  test,
  user_create,
  user_detail_Id,
  user_list,
  user_update,
  user_delete
}