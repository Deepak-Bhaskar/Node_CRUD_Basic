const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const upload = require('../util/common-helper');
const upload = require('../services/upload')

// Simple version without validation pr sanitation
const test = (req, res) => {
  res.send('Greeting from the test controller')
}

// Create user
const user_create = (req, res, next) => {
  if (req.files.profile) {
    // console.log(req.files.profile)
    upload._uploadImage(req.files.profile)
      .then((response) => {
        let user = ''
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            return next(err)
          }
          user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            mobile: req.body.mobile,
            password: hash,
            profile: response
          })

          // Store hash in your password DB.
          user.save((err) => {
            if (err) {
              return next(err)
            }
            res.send('User successfully created.')
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    res.status(400)
    res.send('Profile image is not uploaded.')
  }
}

// Read user by Id
const user_detail_Id = (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
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

const user_login = async (req, res) => {
  let exist = await User.findOne({ email: req.body.username }).select('+password').lean()

  //Check user exist
  if (exist) {

    // Compare password entered from stored hash password.
    const match = await bcrypt.compare(req.body.password, exist.password)
    delete exist.password
    if (match) {
      res.send(exist)
    } else {
      res.status(400)
      res.json({ message: 'Password is invalid' })
    }
  } else {
    res.status(400)
    res.json({ message: 'User not found' })
  }
}

module.exports = {
  test,
  user_create,
  user_detail_Id,
  user_list,
  user_update,
  user_delete,
  user_login
}