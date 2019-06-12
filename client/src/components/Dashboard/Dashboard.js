import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import CreateTicket from "./create-ticket.component";
import EditTicket from "./edit-ticket.component";
import TicketsList from "./tickets-list.component";
import TicketDetails from "./ticket-details.component";
import API from '../../utils/API';

import '../../css/Dashboard.css';

export class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.disconnect.bind(this);
    }
    disconnect = event => {
        API.logout();
        window.location = "/";
    }
    render() {
        return(
            <div>
                <nav>
                    <Link to="/dashboard/ticket" className="nav-link">Tickets</Link>
                    <Link to="/dashboard/ticket/create" className="nav-link">Créer Ticket</Link>
                    <Link onClick={this.disconnect} to="#" className="nav-link">Me déconnecter</Link>
                </nav>
                <Switch>
                    <Route exact path="/dashboard" component={TicketsList} />
                    <Route exact path="/dashboard/ticket" component={TicketsList} />
                    <Route exact path="/dashboard/ticket/create" component={CreateTicket} />
                    <Route exact path="/dashboard/ticket/:id" component={TicketDetails} />
                    <Route path="/dashboard/ticket/:id/edit" component={EditTicket} />
                </Switch>
            </div>
        )
    }
}