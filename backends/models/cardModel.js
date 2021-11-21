const mongoose = require("mongoose");
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    validate: {
      validator: (v) => {
        validator.isURL(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // имя — это строка
    ref: 'user',
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле

  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model('card', cardSchema);
