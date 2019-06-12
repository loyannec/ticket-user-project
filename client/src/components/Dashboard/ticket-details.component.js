import React, { Component } from 'react';


import API from '../../utils/API';

import '../../css/ticket-details.css';

const queryString = require('query-string');

export default class TicketDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ticket_id: '',
			ticket_title: '',
			ticket_description: '',
			ticket_responsible: '',
			ticket_priority: '',
			ticket_completed: false
		}
	}

	getTicketDetails(ticketId) {
		API.getTicketDetails(ticketId).then(res => {
            this.setState({
            	ticket_id: res.data.ticket._id,
            	ticket_title: res.data.ticket.title,
				ticket_description: res.data.ticket.description,
				ticket_responsible: res.data.ticket.responsible,
				ticket_priority: res.data.ticket.priority,
				ticket_completed: res.data.ticket.completed
            });
            console.log(this.state.tickets);
        },function(error){
            console.log(error);
            return;
        })
	}

	componentWillMount() {
        this.getTicketDetails(this.props.match.params.id);
    }

	render() {
		return (
			<div className="details">
				<h1>Details Ticket</h1>
				<h2>Id : {this.state.ticket_id}</h2>
				<h2>Titre : {this.state.ticket_title}</h2>
				<h2>Description : {this.state.ticket_description}</h2>
				<h2>Responsable : {this.state.ticket_responsible}</h2>
				<h2>Priorité : {this.state.ticket_priority}</h2>
				<h2>Statut : {this.state.ticket_completed ? "Résolu" : "En cours"}</h2>
			</div>
		)
	}
}