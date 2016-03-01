/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
<<<<<<< HEAD
  //connection: 'mySql',
=======
  connection: 'mySql',
>>>>>>> cba6c6451cdcc4b94203a1ca2d1272edd0c612b4
  attributes: {
    id: {
      type: 'string',
      unique: true
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      email: true
    }

  },

};
