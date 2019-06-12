import React, { Component } from 'react';

import API from '../../utils/API';

import '../../css/form.css';

export default class EditTicket extends Component {
	constructor(props) {
		super(props);

		this.onChangeTicketTitle = this.onChangeTicketTitle.bind(this);
		this.onChangeTicketDescription = this.onChangeTicketDescription.bind(this);
		this.onChangeTicketResponsible = this.onChangeTicketResponsible.bind(this);
		this.onChangeTicketPriority = this.onChangeTicketPriority.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.editTicket = this.editTicket.bind(this);
		this.getTicketDetails = this.getTicketDetails.bind(this);
		this.onChangeTicketCompleted = this.onChangeTicketCompleted.bind(this);

		this.state = {
			ticket_id: '',
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

	onChangeTicketCompleted(e) {
		this.setState({
			ticket_completed: e.target.checked
		})
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

		this.editTicket(_ticket, this.props.match.params.id);

		this.setState({
			ticket_title: '',
			ticket_description: '',
			ticket_responsible: '',
			ticket_priority: '',
			ticket_completed: false
		})
	}

	editTicket = (ticket, ticketId) => {
        API.editTicket(ticket, ticketId).then(res => {
            window.location = "/dashboard/ticket/"+res.data.ticketId;
        },function(error){
            console.log(error);
            return;
        })
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
			<div style={{marginTop: 10}}>
				<h3>Edit Ticket n°{this.state.ticket_id}</h3>
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
						<label>Responsible: </label>
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
							<label className="form-check-label">Low</label>
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
							<label className="form-check-label">Medium</label>
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
							<label className="form-check-label">High</label>
						</div>
					</div>

					<div className="form-group">
						<label>Completed: </label>
						<input type="checkbox"
						className="btn btn-primary"
						checked={this.state.ticket_completed}
						onChange={this.onChangeTicketCompleted}
						/>
					</div>

					<div className="form-group">
						<input type="submit" value="Update Ticket" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}