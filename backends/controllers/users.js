const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const IncorrectDataError = require('../erors/incorrect-data-err');
const UnauthorizedError = require('../erors/unauthorized-err');
const NotFoundError = require('../erors/not-found-err');
const IncorrectEmail = require('../erors/IncorrectEmail');

const { NODE_ENV, JWT_SECRET } = process.env;

// аутификация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // пользователь с такой почтой не найден
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

          res
            .send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

// Создание нового пользователя
module.exports.postUsers = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10) // хешируем пароль
    .then((hash) => {
      if (!validator.isEmail('aleks@yandex.com')) {
        throw new IncorrectDataError('Передан некорректный e-mail');
      }
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      return res
        .send({

          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,

        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Передан некорректный e-mail'));
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new IncorrectEmail('Пользователь с таким e-mail уже существует'));
      } else {
        next(err);
      }
    });
};
// Возврашение всех пользователей
module.exports.getUser = (reg, res, next) => {
  return User.find({})
    .then((users) => {
      return res
        .send({
          data: users,
        });
    })
    .catch(next);
};

// получения информации о пользователе
module.exports.getUserMe = (req, res, next) => {
  const userIdMe = req.user._id;

  User.findById(userIdMe)
    .then((user) => {
      if (user) {
        return res.send({
          data: user
        });
      }
      throw new NotFoundError('Пользователь по указанному id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Передан некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

// Возврашение пользователя по id
module.exports.getUsersId = (req, res, next) => {
  const userId = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({
          data: user,
        });
      }
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Передан некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};
// обновляет профиль
module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send({
          data: user,
        });
      }
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при обновлении профиля'));
      }
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Передан некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};
// обновляет аватар
module.exports.patchUserAvatar = (req, res, next) => {
  const avatar = req.body;
  return User.findByIdAndUpdate(req.user._id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send({
          data: user,
        });
      }
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при обновлении аватара'));
      }
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Передан некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};
