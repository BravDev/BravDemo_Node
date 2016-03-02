/**
 * MediatorController
 *
 * @description :: Server-side logic for managing mediators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		res.render('pages/mediator', {_layoutFile: '../layouts/mediator_layout.ejs', id: req.param('id')});
	},

};
