const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regExp = require('../regExp/reg-exp');

const {
  getUsers, getUserById, updateUser, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExp),
  }),
}), updateUserAvatar);

module.exports = router;
