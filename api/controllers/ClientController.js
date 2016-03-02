/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		res.render('pages/client', {_layoutFile: '../layouts/client_layout.ejs', id: req.param('id')});
	},

};

