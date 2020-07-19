const UserModel = require('../model/user');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');

module.exports = {
    insert: async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password=salt + "$" + hash;
        
        UserModel.createUser(req.body)
            .then((result) => {
                res.status(201).send({id: result._id});
            });
    },
    validate:(method) => {
        switch (method) {
          case 'createUser': {
           return [ 
              body('name', "name is required").notEmpty(),
              body('email', 'Invalid email').notEmpty().isEmail(),
              body('password').notEmpty().isLength({ min: 5 })
             ]   
          }
        }
    }
}