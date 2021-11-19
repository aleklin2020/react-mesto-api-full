const Card = require("../models/cardModel");
const IncorrectDataError = require('../erors/incorrect-data-err');
const ForbiddenDataError = require('../erors/forbidden-err');
const NotFoundError = require('../erors/not-found-err');

// создает карточку
module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => { return res.send(card); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};
// Возврат всех карточек
module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => { return res.send(cards); })
    .catch(next);
};
// удаление карточки
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      if (card.owner._id.toString() === userId) {
        Card.findByIdAndRemove(cardId)
          .orFail(() => {
            throw new NotFoundError('Карточка с указанным id не найдена');
          })
          .then((deletedCard) => {
            res.send({ data: deletedCard });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new IncorrectDataError('Передан некорректный id при удалении карточки'));
            } else {
              next(err);
            }
          });
      } else {
        next(new ForbiddenDataError('У Вас нет прав на удаление карточки с этим id'));
      }
    });
};
// установка лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.send({ card });
      }
      throw new NotFoundError('Передан несуществующий id карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные для постановки лайка'));
      } else {
        next(err);
      }
    });
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.send({ card });
      }
      throw new NotFoundError('Передан несуществующий id карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные для снятии лайка'));
      } else {
        next(err);
      }
    });
};
