const Ticket = require('../../schema/schemaTicket.js');

function create(req, res) {
	if (!req.body.description || !req.body.responsible || !req.body.priority) {
		res.status(400).json({
			"text": "Requête invalide"
		})
	} else {
		var ticket = {
			title: req.body.title,
			description: req.body.description,
			responsible: req.body.responsible,
			priority: req.body.priority
		}

		var _t = new Ticket(ticket);
		_t.save(function (err, ticket) {
			if (err) {
				res.status(500).json({
					"text": "Erreur interne"
				})
			} else {
				res.status(200).json({
					"text": "Succès",
					"ticketId": ticket.getId()
				})
			}
		})
	}
}

function show(req, res) {
	if (!req.params.id) {
		res.status(400).json({
			"text": "Requête invalide"
		})
	} else {
		var findTicket = new Promise(function (resolve, reject) {
			Ticket.findById(req.params.id, function (err, result) {
				if (err) {
					reject(500);
				} else {
					if (result) {
						resolve(result)
					} else {
						reject(200)
					}
				}
			})
		})

		findTicket.then(function (ticket) {
			res.status(200).json({
				"text": "Succès",
				"ticket": ticket
			})
		}, function (error) {
			switch (error) {
				case 500:
					res.status(500).json({
						"text": "Erreur interne"
					})
					break;
				case 200:
					res.status(200).json({
						"text": "Le ticket n'existe pas"
					})
					break;
				default:
					res.status(500).json({
						"text": "Erreur interne"
					})
			}
		})
	}
}

function update(req, res) {
	if (!req.params.id || !req.body.description || !req.body.responsible || !req.body.priority || req.body.completed == null) {
		res.status(400).json({
			"text": "Requête invalide"
		})
	} else {
		var findTicket = new Promise(function (resolve, reject) {
			Ticket.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
				if (err) {
					reject(500);
				} else {
					if (result) {
						resolve(result)
					} else {
						reject(200)
					}
				}
			})
		})

		findTicket.then(function (ticket) {
			res.status(200).json({
				"text": "Succès",
				"ticketId": ticket.getId()
			})
		}, function (error) {
			switch (error) {
				case 500:
					res.status(500).json({
						"text": "Erreur interne"
					})
					break;
				case 200:
					res.status(200).json({
						"text": "Le ticket n'existe pas"
					})
					break;
				default:
					res.status(500).json({
						"text": "Erreur interne"
					})
			}
		})
	}
}

function list(req, res) {
	var findTicket = new Promise(function (resolve, reject) {
		Ticket.find({}, function (err, tickets) {
			if (err) {
				reject(500);
			} else {
				if (tickets) {
					resolve(tickets)
				} else {
					reject(200)
				}
			}
		})
	})

	findTicket.then(function (tickets) {
		res.status(200).json({
			"text": "Succès",
			"tickets": tickets
		})
	}, function (error) {
		switch (error) {
			case 500:
				res.status(500).json({
					"text": "Erreur interne"
				})
				break;
			case 200:
				res.status(200).json({
					"text": "Il n'y a pas encore de ticket"
				})
				break;
			default:
				res.status(500).json({
					"text": "Erreur interne"
				})
		}
	})
}

exports.create = create;
exports.show = show;
exports.update = update;
exports.list = list;