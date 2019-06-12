import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
}

const burl = "http://localhost:8000"

export default {
    login : function(email,password) {
        return axios.post(burl + '/user/login',{
            'email' : email,
            'password' : password
        },{
            headers: headers
        })
    },

    signup : function(send){
        return axios.post(burl + '/user/signup',send,{headers: headers})
    },
    
    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },

    logout : function() {
        localStorage.clear();
    },

    getTickets : function() {
        return axios.get(burl + '/ticket',{headers: headers})
    },

    createTicket : function(ticket) {
        return axios.post(burl + '/ticket/create',ticket,{headers: headers})
    },

    getTicketDetails: function(ticketId) {
        return axios.get(burl + '/ticket/'+ticketId,{headers: headers})
    },

    editTicket : function(ticket, ticketId) {
        return axios.post(burl + '/ticket/'+ticketId+'/update',ticket,{headers: headers})
    }
}