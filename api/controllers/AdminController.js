/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view: function(req, res) {
		res.render('pages/admin_view', {_layoutFile: '../shared/admin_layout.ejs', id: req.param('id')});
	},

	session: function(req, res) {
		res.render('pages/admin_session', {_layoutFile: '../shared/admin_layout.ejs', id: req.param('id')});
	}
};
