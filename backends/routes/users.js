const router = require("express").Router();
const { celebrate, Joi } = require('celebrate');
const { method } = require('../method/method');
const {
  getUser,
  getUsersId,
  patchUser,
  patchUserAvatar,
  getUserMe,
} = require("../controllers/users");

router.get('/users/me', getUserMe); // получение информация о пользователи

router.get('/users', getUser); // Возврат всех пользователей
router.get('/users/:userId',
  celebrate({
  // валидируем параметры
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUsersId); // возврат пользователя по id

router.patch('/users/me',
  celebrate({
  // валидируем body
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  patchUser); // обеовление профиля

router.patch('/users/me/avatar',
  celebrate({
  // валидируем body
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(method),
    }),
  }),
  patchUserAvatar); // обновление аватар
module.exports = router;
