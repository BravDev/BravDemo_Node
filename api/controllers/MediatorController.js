/**
 * MediatorController
 *
 * @description :: Server-side logic for managing mediators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
<<<<<<< HEAD
		res.render('pages/mediator', {_layoutFile: '../layouts/mediator_layout.ejs', id: req.param('id')});
=======
		res.render('pages/mediator', {_layoutFile: '../shared/mediator_layout.ejs', id: req.param('id')});
>>>>>>> cba6c6451cdcc4b94203a1ca2d1272edd0c612b4
	},

};
