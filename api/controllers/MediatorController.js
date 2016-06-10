/**
 * MediatorController
 *
 * @description :: Server-side logic for managing mediators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	readDocFile : function(req , res) {

		   sails.office.readFile("photoconsent.docx", function (err, bodyObject) {
				if(err) throw err

				return res.send(bodyObject);
		})
	}
};
