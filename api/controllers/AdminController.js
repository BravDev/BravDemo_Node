/**
 * Admin_layoutController
 *
 * @description :: Server-side logic for managing admin_layouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		res.render('pages/mediator', {_layoutFile: '../layouts/admin_layout.ejs', id: req.param('id')});
	},

};

