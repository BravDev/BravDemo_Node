/**
 * NotesController
 *
 * @description :: Server-side logic for managing Notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getNotes: function(req, res) {
        NotesService.getNotes(function(todos) {           
            res.json(todos);
        });
    },
    addNotes: function(req, res) {
        var notesVal = (req.body.value) ? req.body.value : undefined
        NotesService.addNotes(notesVal, function(success) {
            res.json(success);
        });
    },
    removeNotes: function(req, res) {
       var notesVal = (req.body.value) ? req.body.value : undefined
        NotesService.removeNotes(notesVal, function(success) {
            res.json(success);
        });
    }
};

