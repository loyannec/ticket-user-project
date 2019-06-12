import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../utils/API';

import '../../css/ticket-list.css';

export default class TodosList extends Component {
	constructor(props) {
        super(props);
        this.state = {
            tickets: []
        }
        this.getTickets.bind(this);
    }

    getTickets = () => {
        API.getTickets().then(res => {
            this.setState({
            	tickets: res.data.tickets
            });
            console.log(this.state.tickets);
        },function(error){
            console.log(error);
            return;
        })
    }

    componentWillMount() {
        this.getTickets();
    }

	render() {
		return (
			<div>
				<h1>Liste des tickets</h1>
                <table>
                    <thead>
                        <tr>
                            <th className="idTicket">Tichet ID</th>
                            <th className="showTicket">Voir Ticket</th>
                            <th className="editTicket">Editer Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.map( (ticket, index) => {
                            return (
                                <tr key={index}>
                                    <td>{ticket._id}</td>
                                    <td><Link to={`/dashboard/ticket/${ticket._id}`} className="nav-link">Voir</Link></td>
                                    <td><Link to={`/dashboard/ticket/${ticket._id}/edit`} className="nav-link">Editer</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
			</div>
		)
	}
}