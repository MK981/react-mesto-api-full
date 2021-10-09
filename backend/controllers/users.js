const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err'); // 404
const BadRequestError = require('../errors/bad-request-err'); // 400
const AuthError = require('../errors/auth-err'); // 401
const ConflictError = require('../errors/conflict-error'); // 409

const { NODE_ENV, JWT_SECRET } = process.env;

// создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id, name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании пользователя');
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictError('Пользователь с данным email уже существует');
      }
      throw new Error();
    })
    .catch(next);
};

// получаем список пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

// находим пользователя по айди
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные пользователя');
      }
      // throw new Error();
      next(err);
    })
    .catch(next);
};

// обновляем профиль
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении пользователя');
      }
      next(err);
    })
    .catch(next);
};

// обновляем аватар
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении пользователя');
      }
      next(err);
    })
    .catch(next);
};

// логин, создаем jwt
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  /* User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
        // throw new AuthError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // throw new AuthError('Неправильные почта или пароль');
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }

          // аутентификация успешна
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          return res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          });
          // return res.send({ token });
        })
        .catch(next);
    })
    .catch(next); */

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      /* res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }); */

      res.send({ token });
    })
    .catch(() => {
      throw new AuthError('Неправильные почта или пароль');
    })
    .catch(next);
};

// получаем данные пользователя
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      // res.status(200).send({ data: user });
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные пользователя');
      }
      throw new Error();
    })
    .catch(next);
};
