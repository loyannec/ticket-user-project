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
				<h1>Tickets List</h1>
                <table>
                    <thead>
                        <tr>
                            <th className="idTicket">Tichet ID</th>
                            <th className="showTicket">Show Ticket</th>
                            <th className="editTicket">Edit Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.map( (ticket, index) => {
                            console.log("plop");
                            console.log(this.state.tickets);
                            return (
                                <tr key={index}>
                                    <td>{ticket._id}</td>
                                    <td><Link to={`/dashboard/ticket/${ticket._id}`} className="nav-link">Show</Link></td>
                                    <td><Link to={`/dashboard/ticket/${ticket._id}/edit`} className="nav-link">Edit</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
			</div>
		)
	}
}