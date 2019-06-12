import React from 'react';
import API from '../../utils/API';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: ""
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        event.preventDefault();

        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0){
            return;
        }
        API.login(this.state.email, this.state.password).then(function(res){
            localStorage.setItem('token', res.data.token);
            window.location = "/dashboard/ticket"
        },function(error){
            console.log(error);
            return;
        })
    }   

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    componentDidMount() {
        if (API.isAuth()===true) {
            window.location = "/dashboard/ticket";
        }
    }

    render() {
        return(
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input autoFocus type="email" value={this.state.email} onChange={this.handleChange} id="email"/>
                </div>

                <div className="form-group" controlId="password">
                    <label>Password</label>
                    <input value={this.state.password} onChange={this.handleChange} type="password" id="password"/>
                </div>
                
                <div className="form-group">
                    <input onClick={this.send} type="submit" value="Connexion" className="btn btn-primary" />
                </div>
            </form>
        )
    }
}