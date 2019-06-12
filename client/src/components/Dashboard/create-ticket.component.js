import React, { Component } from 'react';

import API from '../../utils/API';

import '../../css/form.css';

export default class CreateTicket extends Component {
	constructor(props) {
		super(props);

		this.onChangeTicketTitle = this.onChangeTicketTitle.bind(this);
		this.onChangeTicketDescription = this.onChangeTicketDescription.bind(this);
		this.onChangeTicketResponsible = this.onChangeTicketResponsible.bind(this);
		this.onChangeTicketPriority = this.onChangeTicketPriority.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.createTickets = this.createTickets.bind(this);

		this.state = {
			ticket_title: '',
			ticket_description: '',
			ticket_responsible: '',
			ticket_priority: '',
			ticket_completed: false
		}
	}

	onChangeTicketTitle(e) {
		this.setState({
			ticket_title: e.target.value
		});
	}

	onChangeTicketDescription(e) {
		this.setState({
			ticket_description: e.target.value
		});
	}

	onChangeTicketResponsible(e) {
		this.setState({
			ticket_responsible: e.target.value
		});
	}

	onChangeTicketPriority(e) {
		this.setState({
			ticket_priority: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		var _ticket = {
			title: this.state.ticket_title,
			description: this.state.ticket_description,
			responsible: this.state.ticket_responsible,
			priority: this.state.ticket_priority,
			completed: this.state.ticket_completed
		}

		this.createTickets(_ticket);

		this.setState({
			ticket_title: '',
			ticket_description: '',
			ticket_responsible: '',
			ticket_priority: '',
			ticket_completed: false
		})
	}

	createTickets = (ticket) => {
        API.createTicket(ticket).then(res => {
            window.location = "/dashboard/ticket/"+res.data.ticketId;
        },function(error){
            console.log(error);
            return;
        })
    }

	render() {
		return (
			<div style={{marginTop: 10}}>
				<h3>Créer un nouveau ticket</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Titre: </label>
						<input 
						type="text" 
						className="form-control"
						value={this.state.ticket_title}
						onChange={this.onChangeTicketTitle}
						/>
					</div>

					<div className="form-group"> 
						<label>Description: </label>
						<textarea  type="text"
						className="form-control"
						value={this.state.ticket_description}
						onChange={this.onChangeTicketDescription}
						/>
					</div>

					<div className="form-group">
						<label>Responsable: </label>
						<input 
						type="text" 
						className="form-control"
						value={this.state.ticket_responsible}
						onChange={this.onChangeTicketResponsible}
						/>
					</div>

					<div className="form-group">
						<label>Priorité: </label>
						<div className="form-check form-check-inline">
							<input  className="form-check-input" 
							type="radio" 
							name="priorityOptions" 
							id="priorityLow" 
							value="Low"
							checked={this.state.ticket_priority==='Low'} 
							onChange={this.onChangeTicketPriority}
							/>
							<label className="form-check-label">Basse</label>
						</div>

						<div className="form-check form-check-inline">
							<input  className="form-check-input" 
							type="radio" 
							name="priorityOptions" 
							id="priorityMedium" 
							value="Medium" 
							checked={this.state.ticket_priority==='Medium'} 
							onChange={this.onChangeTicketPriority}
							/>
							<label className="form-check-label">Moyen</label>
						</div>

						<div className="form-check form-check-inline">
							<input  className="form-check-input" 
							type="radio" 
							name="priorityOptions" 
							id="priorityHigh" 
							value="High" 
							checked={this.state.ticket_priority==='High'} 
							onChange={this.onChangeTicketPriority}
							/>
							<label className="form-check-label">Haute</label>
						</div>
					</div>

					<div className="form-group">
						<input type="submit" value="Create Ticket" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}