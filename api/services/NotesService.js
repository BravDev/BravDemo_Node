module.exports = {
  getNotes: function(next) {
    Notes.find().exec(function(err, todos) {
      if(err) throw err;
      next(todos);
    });
  },
  addNotes: function(todoVal, next) {
    Notes.create({value: todoVal}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  },
  removeNotes: function(todoVal, next) {

    Notes.destroy({value: todoVal}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  }
};