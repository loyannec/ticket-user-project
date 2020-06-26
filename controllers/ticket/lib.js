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
			.populate({
				path: 'comments.user',
				model: User
			})
			.lean()
		})

		findTicket.then(function (ticket) {
			res.status(200).render('ticket/show', {title: `Ticket ${ticket.title}`, ticket });
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

function update(req, res) {
	console.log("**********Inside update method************")
	console.log(req.body);
	if (!req.params.id || !req.body.description || !req.body.priority) {
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
				console.log("****Retrieve username values from database****")
				var userNames = new Promise(function (resolve, reject) {
					User.find({isAdmin:false},{name:1,_id:0}, (err, usernames) => {
						if (err) {
							reject(500);
						} else {
							if (usernames) {
								resolve(usernames)
							} else {
								reject(200)
							}
						}
					})
				});
				userNames.then(function (usernames) {
					console.log("******Tickets value**********"+JSON.stringify(tickets))
					console.log("******usernames value**********"+JSON.stringify(usernames))
					console.log("******user value**********"+JSON.stringify(user))
					res.status(200).render('ticket/index', {title: 'Liste des tickets', tickets,usernames,user});
				}, function (error) {
					switch (error) {
						case 500:
							res.status(500).json({
								"text": "Erreur interne"
							})
							break;
						case 200:
							res.status(200).json({
								"text": "Username doesnot exist"
							})
							break;
						default:
							res.status(500).json({
								"text": "Erreur interne"
							})
					}
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

function assign(req, res) {
	console.log("**********Inside assign method************")
	console.log(req.body);
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
			res.redirect('/ticket/')
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

async function addComment(req, res) {
	const ticketId = req.params.id;
	var ticket = await Ticket.findById(ticketId);

	if (!ticket) {
		res.sendStatus(404);
		return;
	}

	const comment = {
		user: req.user._id,
		message: req.body.comment,
		date: new Date()
	};
	ticket.comments.push(comment);

	ticket.save((err) => {
		if (err) {
			throw err;
		}
		comment.user = req.user;
		res.render('ticket/comment', { comment });
	});
}

exports.create = create;
exports.createForm = createForm;
exports.show = show;
exports.edit = edit;
exports.update = update;
exports.list = list;
exports.addComment = addComment;
exports.assign = assign;
