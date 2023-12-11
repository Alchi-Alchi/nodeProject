import {body} from 'express-validator';

export const validator = [
    body('login', 'Short login. Min 3 symbols').isLength({min: 3}),
    body('password', 'Short password. Min 5 symbols').isLength({min: 5}),
];

export const addUser = [
    body('login', 'Short login. Min 3 symbols').isLength({min: 3}),
    body('password', 'Short password. Min 5 symbols').isLength({min: 5}),
    body('user', 'Add name of user').isString(),
];