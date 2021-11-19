const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    default: "Жак-Ив Кусто",
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String, // имя — это строка
    default: "Исследователь",
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: {
    type: String, // имя — это строка
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (v) => {
        validator.isURL(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});
module.exports = mongoose.model("user", userSchema);
