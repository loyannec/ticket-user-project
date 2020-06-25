const Ticket = require('../../schema/schemaTicket.js');
const User = require('../../schema/schemaUser.js');
function create(req, res) {
	console.log("**********Inside create method************")
	if (!req.body.description || !req.body.priority || !req.user.email) {
		res.status(400).json({
			"text": "Requête invalide"
		})
	} else {
		var ticket = {
			title: req.body.title,
			description: req.body.description,
			/* responsible: req.body.responsible, */
			priority: req.body.priority,
			createdBy:req.user.email,
			isValidated: false //updated for admin functionality
		}

		var _t = new Ticket(ticket);
		_t.save(function (err, ticket) {
			if (err) {
				res.status(500).json({
					"text": "Erreur interne"
				})
			} else {
				res.redirect(`${ticket.getId()}`);
			}
		})
	}
}

function createForm(req, res) {
	console.log("**********Inside createForm method************")
	res.status(200).render('ticket/create', {title: 'Créer ticket'});
}

function show(req, res) {
	console.log("**********Inside show method************")
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
			res.status(200).render('ticket/show', {title: `Ticket ${ticket.title}`, ticket,});
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

function edit(req, res) {
	console.log("**********Inside edit method************")
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
			res.status(200).render('ticket/edit', {title: `Modifier ticket n°${ticket._id}`, ticket});
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


function showbuttons(req, res) {
	console.log("**********Inside showbuttons method************")
	if (req.user.isAdmin){} 
}

function update(req, res) {
	console.log("**********Inside update method************")
	console.log(req.body);
	if (!req.params.id || !req.body.description || !req.body.responsible || !req.body.priority) {
		res.status(400).json({
			"text": "Requête invalide"
		})
	} else {
		var findTicket = new Promise(function (resolve, reject) {
			req.body.completed = typeof req.body.completed !== 'undefined' ? true : false;

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
			res.redirect(`../${ticket.getId()}`);
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

/* function list(req, res) {
	console.log("**********Inside list method************"+JSON.stringify(req.user.email))
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
		res.status(200).render('ticket/index', {title: 'Liste des tickets', tickets});
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
 */









function list(req, res) {
	console.log("**********Inside list method************"+JSON.stringify(req.user.email))
	var checkUser=new Promise(function(resolve,reject){
		User.find({email:req.user.email},function(err,user){
			if (err) {
				reject(500);
			} else {
				if (user) {
					resolve(user)
				} else {
					reject(200)
				}
			}
		})
	})

	checkUser.then(function (user) {
		console.log("********"+JSON.stringify(user)+user[0].isAdmin)
		/* if (user[0].isAdmin){ */
		//	console.log("************USER ADMIN USER")
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
				res.status(200).render('ticket/index', {title: 'Liste des tickets', tickets,user});
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
		/* }else{
			console.log("************USER NORMAL USER")
			var findTicket = new Promise(function (resolve, reject) {
				Ticket.find({isValidated:true}, function (err, tickets) {
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
				res.status(200).render('ticket/index', {title: 'Liste des tickets', tickets,user});
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
 */
	},function (error) {
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
exports.createForm = createForm;
exports.show = show;
exports.edit = edit;
exports.update = update;
exports.list = list;
