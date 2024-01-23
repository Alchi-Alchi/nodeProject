import {body} from 'express-validator';

export const validator = [
    body('login', 'Short login. Min 3 symbols').isLength({min: 3}),
    body('password', 'Short password. Min 5 symbols').isLength({min: 5}),
];

export const registerValidator = [
    body('email', 'Wrong email').isEmail(),
    body('userName', 'Short name. Min 3 symbols').isLength({min: 3}),
    body('login', 'Short login. Min 3 symbols').isLength({min: 3}),
    body('password', 'Short password. Min 5 symbols').isLength({min: 5}),
    body('avatarURL', 'Wrong link').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок').isLength({min: 3}).isString(),
    body('text', 'Введите текст').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тегов').optional().isString(),
    body('imageURL', 'Неверная ссылка').optional().isString(),
];