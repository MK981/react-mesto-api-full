const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ваше имя',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Описание',
  },
  avatar: {
    type: String,
    // default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    default: 'https://variant-nk.ru/images/noPhoto.png',
    validate: {
      validator: (v) => isURL(v),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
